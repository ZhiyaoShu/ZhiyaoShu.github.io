import datetime
from typing import List
from pydantic import BaseModel

class Papers(BaseModel):
    id: int
    title: str
    authors: List[str]
    abstract: str
    date: datetime.date

