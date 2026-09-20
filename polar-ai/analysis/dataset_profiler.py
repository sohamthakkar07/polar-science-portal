# This module intercepts numerical questions and uses the precomputed dataset metadata
# to provide exact answers without hallucination.

import csv
import os

class DatasetProfiler:
    def __init__(self, vector_store):
        self.vector_store = vector_store

    def try_generate_chart(self, query: str, context_chunks: list) -> dict:
        q_lower = query.lower()
        vis_keywords = ["visualize", "visualise", "plot", "graph", "chart", "trend", "compare", "relationship", "show antarctic sea ice extent over time"]
        
        has_kw = any(kw in q_lower for kw in vis_keywords)
        print(f"[DEBUG] try_generate_chart: has_kw={has_kw}")
        if not has_kw:
            return None
            
        has_sea_ice = any(c.get("source_file") == "antarctic_sea_ice.csv" for c in context_chunks)
        print(f"[DEBUG] try_generate_chart: has_sea_ice={has_sea_ice}, chunks={[c.get('source_file') for c in context_chunks]}")
        if not has_sea_ice:
            return None
            
        csv_path = os.path.join(os.path.dirname(__file__), "..", "knowledge", "datasets", "antarctic_sea_ice.csv")
        print(f"[DEBUG] try_generate_chart: csv_path={csv_path}, exists={os.path.exists(csv_path)}")
        if not os.path.exists(csv_path):
            return None
            
        data = []
        with open(csv_path, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                row["YearMonth"] = f"{row['Year']}-{row['Month']}"
                row["Sea_Ice_Extent_Million_Sq_Km"] = float(row["Sea_Ice_Extent_Million_Sq_Km"])
                row["Anomaly"] = float(row["Anomaly"])
                data.append(row)
                
        data.sort(key=lambda x: x["YearMonth"])
        
        if "relationship" in q_lower and "anomaly" in q_lower:
            return {
                "type": "scatter",
                "title": "Relationship: Sea Ice Extent vs Anomaly",
                "xKey": "Sea_Ice_Extent_Million_Sq_Km",
                "yKey": "Anomaly",
                "series": [{"dataKey": "Anomaly", "label": "Anomaly"}],
                "data": data
            }
        elif "compare" in q_lower and "month" in q_lower:
            monthly_data = {}
            for row in data:
                m = row["Month"]
                if m not in monthly_data:
                    monthly_data[m] = []
                monthly_data[m].append(row["Sea_Ice_Extent_Million_Sq_Km"])
                
            bar_data = []
            for m in sorted(monthly_data.keys()):
                avg_extent = sum(monthly_data[m]) / len(monthly_data[m])
                bar_data.append({"Month": m, "Sea_Ice_Extent_Million_Sq_Km": round(avg_extent, 2)})
                
            return {
                "type": "bar",
                "title": "Average Sea Ice Extent by Month",
                "xKey": "Month",
                "series": [{"dataKey": "Sea_Ice_Extent_Million_Sq_Km", "label": "Average Extent (M sq km)"}],
                "data": bar_data
            }
        else:
            return {
                "type": "line",
                "title": "Antarctic Sea Ice Extent Over Time",
                "xKey": "YearMonth",
                "series": [{"dataKey": "Sea_Ice_Extent_Million_Sq_Km", "label": "Extent (M sq km)"}],
                "data": data
            }

    def try_answer_computationally(self, query: str, context_chunks: list) -> str:
        # Check if the query asks for numerical analysis
        q_lower = query.lower()
        needs_computation = any(kw in q_lower for kw in ["average", "mean", "min", "max", "how many rows", "count"])
        
        if not needs_computation:
            return None
            
        # Search the context chunks for dataset metadata
        for chunk in context_chunks:
            if chunk.get("document_type") == "DATASET":
                content = chunk.get("content", "").lower()
                
                # If they asked for average/mean
                if "average" in q_lower or "mean" in q_lower:
                    if "mean=" in content:
                        return f"Based on the dataset profile, here are the computed averages:\n{self._extract_stats(chunk['content'])}"
                        
                # If they asked for rows
                if "how many rows" in q_lower or "count" in q_lower:
                    if "rows:" in content:
                        return f"Based on the dataset profile, the dataset contains: {self._extract_rows(chunk['content'])} rows."

        return None
        
    def _extract_stats(self, content: str) -> str:
        lines = content.split('\n')
        stats_lines = [l for l in lines if l.strip().startswith('-') and 'mean=' in l]
        return "\n".join(stats_lines)

    def _extract_rows(self, content: str) -> str:
        lines = content.split('\n')
        for l in lines:
            if l.startswith("Rows:"):
                return l.split(":")[1].strip()
        return "Unknown"
