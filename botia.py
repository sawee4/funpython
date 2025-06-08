
from fastapi import FastAPI, Request
from pydantic import BaseModel
import language_tool_python

app = FastAPI()
tool = language_tool_python.LanguageTool('fr')# Pour le français

class EmailText(BaseModel):
    texte: str

@app.post("/analyse")
async def analyse_email(data: EmailText):
    original = data.texte
