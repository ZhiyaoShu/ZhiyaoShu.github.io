import datetime
from typing import List
from pydantic import BaseModel

class Papers(BaseModel):
    id: int
    title: str
    authors: List[str]
    abstract: str
    date: datetime.date

    @staticmethod
    def get_papers():
        papers = []
        for i in range(1, 11):
            paper = Papers(
                id=i,
                title=f"Paper {i}",
                authors=[f"Author {i}"],
                abstract=f"Abstract {i}",
                date=datetime.date.today()
            )
            papers.append(paper)
        return papers