import pandas as pd
import os
from typing import List, Dict

class DatasetLoader:
    def __init__(self):
        pass

    def load_dataset(self, file_path: str, metadata: dict = None) -> List[Dict]:
        if metadata is None:
            metadata = {}
            
        filename = os.path.basename(file_path)
        
        try:
            if file_path.endswith('.csv'):
                df = pd.read_csv(file_path)
            elif file_path.endswith('.xlsx'):
                df = pd.read_excel(file_path)
            else:
                return []
                
            row_count = len(df)
            columns = df.columns.tolist()
            missing_values = df.isnull().sum().to_dict()
            
            # Basic profiling
            numeric_cols = df.select_dtypes(include=['number']).columns.tolist()
            stats = {}
            for col in numeric_cols:
                stats[col] = {
                    "mean": float(df[col].mean()) if not pd.isna(df[col].mean()) else None,
                    "min": float(df[col].min()) if not pd.isna(df[col].min()) else None,
                    "max": float(df[col].max()) if not pd.isna(df[col].max()) else None
                }
                
            # Create a textual representation of the dataset for the semantic search
            description = (
                f"Dataset Name: {metadata.get('title', filename)}\n"
                f"File: {filename}\n"
                f"Rows: {row_count}\n"
                f"Columns: {', '.join(columns)}\n"
            )
            
            if stats:
                description += "Numerical Column Statistics:\n"
                for col, s in stats.items():
                    if s['mean'] is not None:
                        description += f"- {col}: mean={s['mean']:.2f}, min={s['min']:.2f}, max={s['max']:.2f}\n"
                        
            # We return exactly one chunk representing the dataset metadata
            chunk = {
                "chunk_id": f"{filename}_meta",
                "document_id": metadata.get("document_id", filename),
                "document_title": metadata.get("title", filename),
                "page_number": 1,
                "content": description,
                "source_file": filename,
                "document_type": "DATASET",
                "metadata": {
                    **metadata,
                    "columns": columns,
                    "row_count": row_count,
                    "missing": missing_values
                }
            }
            return [chunk]
            
        except Exception as e:
            print(f"Error loading dataset {file_path}: {e}")
            return []
