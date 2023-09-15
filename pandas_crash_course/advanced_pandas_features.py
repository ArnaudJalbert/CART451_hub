import pandas as pd
import re

dataframe = pd.read_csv("pokemon_data.csv")

# filter examples

new_dataframe = dataframe.loc[
    (dataframe["Type 1"] == "Water")
    & (dataframe["Type 2"] == "Poison")
    & (dataframe["HP"] > 50)
]
print(new_dataframe)

# reset the index
new_dataframe.reset_index(drop=True, inplace=True)
print(new_dataframe)

# remove items with a condition
print(dataframe.loc[~dataframe["Type 1"].str.contains("fire|water", regex=True, flags=re.I)])

# change all values that match a condition with another value
dataframe.loc[dataframe["Type 1"] == "Fire", "Type 1"] = "Eau"
print(dataframe)