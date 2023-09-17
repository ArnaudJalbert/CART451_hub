import matplotlib.pyplot as plt
import numpy as np
import pandas as pd


def basic_graph():
    x = [1, 2, 3, 4]
    y = [2, 5, 4, 1]
    plt.plot(x, y)
    plt.show()


def basic_graph_v002():
    x = [1, 2, 3, 4]
    y = [2, 5, 4, 1]
    plt.plot(x, y)
    plt.title("Graph v002", fontdict={"fontname": "Helvetica", "fontsize": 20})
    plt.xlabel("X")
    plt.ylabel("Y")
    plt.show()


def basic_graph_v003():
    x = [1, 2, 3, 4]
    y = [2, 5, 4, 1]
    plt.plot(x, y)
    plt.title("Graph v002", fontdict={"fontname": "Helvetica", "fontsize": 20})
    plt.xlabel("X")
    plt.ylabel("Y")
    plt.xticks([1, 2, 3, 4])
    plt.yticks([2, 4, 6, 8, 10])
    plt.show()


def basic_graph_v004():
    x = [1, 2, 3, 4]
    y = [2, 5, 4, 1]
    plt.plot(x, y, label="Random")
    plt.title("Graph v002", fontdict={"fontname": "Helvetica", "fontsize": 20})
    plt.xlabel("X")
    plt.ylabel("Y")
    plt.xticks([1, 2, 3, 4])
    plt.yticks([2, 4, 6, 8, 10])
    plt.legend()
    plt.show()


if __name__ == "__main__":
    basic_graph_v004()
