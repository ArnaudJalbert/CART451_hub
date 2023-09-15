import pandas as pd

dataframe = pd.read_csv("pokemon_data.csv")
dataframe_excel = pd.read_excel("pokemon_data.xlsx")
dataframe_tabs = pd.read_csv("pokemon_data.txt", delimiter="\t")

print(dataframe.tail(10))
print(dataframe_excel.tail(10))
print(dataframe_tabs.head(3))

# get all columns name
print(dataframe.columns)

# get only the "Name" column
print(dataframe["Name"])
print(dataframe.Name)

# get only the "Name" column between index 25 and 34
print(dataframe["Name"][25:35])

# get multiple columns by name
print(dataframe[["Name", "HP", "Type 1"]])

# get a specific row by index
print(dataframe.iloc[3])

# get specific rows by index
print(dataframe.iloc[3:7])

# get a row and specific column index
print(dataframe.iloc[3, 1])

# iterate over a dataframe
for index, row in dataframe.iterrows():
    print(row["HP"])

# finding specific data that is not integer-based
# find info using information
print(dataframe.loc[dataframe["Type 1"] == "Fire"])

# give different stats
print(dataframe.describe())

# sort by values
print(dataframe.sort_values(["Type 1", "HP"], ascending=[True, False]))

# operations on multiple rows + adding a new row
dataframe["Total Attack"] = dataframe["Attack"] + dataframe["Sp. Atk"]
print(dataframe["Total Attack"])

# removing the total attack column
dataframe = dataframe.drop(columns=["Total Attack"])
try:
    print(dataframe["Total Attack"])
except Exception:
    print("no total attack")

# expression to create new rows
dataframe["Total Numbers"] = dataframe.iloc[:, 4:9].sum(axis=1)
print(dataframe["Total Numbers"])

columns = dataframe.columns.to_list()

dataframe.to_csv("modified.csv", index=False)
dataframe.to_excel("modified.xlsx", index=False)
dataframe.to_csv("modified_tab.csv", index=False, sep=",")
