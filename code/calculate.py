import pandas as pd

df = pd.read_csv("../Input/input.csv")
# "Pair Number",A,B
df["A+B"] = df["A"].astype(int) + df["B"].astype(int)
df.to_csv("../Smalloutput/smalloutput.csv", index=False)