import pandas as pd

dataframe = pd.read_csv("pokemon_data.csv")

print(dataframe.groupby(["Type 1"]).mean())