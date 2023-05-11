import pandas as pd

df = pd.read_csv("../Input/input.csv")
# "Pair Number",A,B
df["A+B"] = df["A"].astype(int) + df["B"].astype(int)
# df.drop(["Pair Number"], axis=1, inplace=True)
df.to_csv("../Smalloutput/smalloutput.csv", index=False)