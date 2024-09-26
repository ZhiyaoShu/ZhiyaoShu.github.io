from llama_index.llms.openai import OpenAI
from llama_index.core import Settings
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.core.program import FunctionCallingProgram
from backend.callFunctions import Papers
from backend.prompt import template

Settings.llm = OpenAI(temperature=0.2, model="gpt-4o-mini")

documents = SimpleDirectoryReader("data").load_data()
index = VectorStoreIndex.from_documents(
    documents,
)

program = FunctionCallingProgram.from_defaults(
    output_cls=Papers,
    prompt_template_str=template,
    verbose=True,
)
