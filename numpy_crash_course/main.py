import numpy as np


def np_info():
    numpy_array = np.array([1, 2, 3])
    print(numpy_array)
    print(numpy_array.shape)
    print(numpy_array.dtype)
    print(numpy_array.ndim)
    print(numpy_array.size)
    print(numpy_array.itemsize)


def np_basic_multiplication():
    numpy_array = np.array([1, 2, 3, 4])
    print(numpy_array * np.array([2, 0, 3, 2]))


def python_list_vs_numpy_array():
    python_list = [1, 2, 3]
    numpy_array = np.array(python_list)
    python_list.append(4)
    print(f"Python List: {python_list}")
    # numpy_array.append(4) -> Raises error, array length is fixed
    numpy_array = numpy_array + np.array([4])
    # is the same things as numpy_array = numpy_array + 4
    # does not add element, adds the array content to the array
    print(f"Numpy Array: {numpy_array}")


def basic_math_operations():
    # Create two NumPy arrays
    arr1 = np.array([1, 2, 3, 4])
    arr2 = np.array([5, 6, 7, 8])

    # Addition
    result_add = arr1 + arr2
    print("Addition:")
    print(result_add)

    # Subtraction
    result_sub = arr1 - arr2
    print("\nSubtraction:")
    print(result_sub)

    # Multiplication (element-wise)
    result_mul = arr1 * arr2
    print("\nMultiplication (element-wise):")
    print(result_mul)

    # Division (element-wise)
    result_div = arr1 / arr2
    print("\nDivision (element-wise):")
    print(result_div)

    # Scalar addition
    scalar = 10
    result_scalar_add = arr1 + scalar
    print("\nScalar Addition:")
    print(result_scalar_add)

    # Scalar subtraction
    result_scalar_sub = arr1 - scalar
    print("\nScalar Subtraction:")
    print(result_scalar_sub)

    # Scalar multiplication
    result_scalar_mul = arr1 * scalar
    print("\nScalar Multiplication:")
    print(result_scalar_mul)

    # Scalar division
    result_scalar_div = arr1 / scalar
    print("\nScalar Division:")
    print(result_scalar_div)

    # Exponentiation
    result_exp = np.exp(arr1)
    print("\nExponentiation:")
    print(result_exp)

    # Square root
    result_sqrt = np.sqrt(arr1)
    print("\nSquare Root:")
    print(result_sqrt)

    # Sum of all elements
    sum_elements = np.sum(arr1)
    print("\nSum of all elements:")
    print(sum_elements)

    # Mean of all elements
    mean_elements = np.mean(arr1)
    print("\nMean of all elements:")
    print(mean_elements)


def multi_dimension_array():
    a = np.array([[1, 2, 6], [3, 4, 9]])
    a_square = np.array([[1, 2, 6], [3, 4, 9], [7, 8, 9]])
    print(a)
    print(a.shape)
    # print the first column
    print(a[:, 0])
    # print the first row
    print(a[0, :])
    # transpose the array
    print(a.T)
    # inverse the array
    print(np.linalg.inv(a_square))
    # make an array diagonal
    print(np.diag(a))


def boolean_index():
    a = np.array([[1, 2, 6], [3, 4, 9]])
    bool_index = a >= 3
    print(bool_index)
    new_array = a[bool_index]
    print(new_array)
    # can be simplified
    new_array = a[a >= 3]
    print(new_array)
    # can keep the same shape
    print(np.where(a <= 3, a, -1))


def fancy_indexing():
    a = np.array([1, 2, 6, 3, 4, 9])
    b = np.array([1, 3, 5])
    print(a[b])
    # also works with python lists
    even = np.argwhere(
        a % 2 == 0
    ).flatten()  # gives use all the indices where condition is true
    print(even)  # array of indices
    print(a[even])  # use fancy indexing to retrieve them


def reshape_array():
    a = np.arange(1, 7)
    print(a)
    print(a.shape)
    b = a.reshape((2, 3))
    print(b)


def concatenate_array():
    a = np.array([[1, 2], [3, 4]])
    b = np.array([[5, 6]])
    c = np.concatenate((a, b))
    print(c)


def broadcasting():
    a = np.array([[1, 2], [3, 4], [5, 6], [7, 8]])
    print(a + np.array([1, 0]))
    print(a * np.array([0, 3]))
    print(a - np.array([2, -1]))


def function_and_axis():
    a = np.arange(7, 14)
    b = np.arange(17, 24)
    c = np.array([a, b])
    print(a)
    print(b)
    print(c)
    print(c.sum())
    axis_0 = c.sum(axis=0)  # axis=0 will make the sum along the columns
    assert axis_0[0] == 24
    print(axis_0)
    axis_1 = c.sum(axis=1)  # axis=1 will make the sum over the rows
    print(axis_1)
    assert axis_1[0] == a.sum()


def datatypes():
    x = np.array(
        [1.0, 2.0], dtype=np.int32
    )  # will convert to int32 even though the arguments are float
    print(x)


def generating_arrays():
    a = np.zeros((2, 3))
    print(a)
    # [[0. 0. 0.]
    #  [0. 0. 0.]]
    b = np.ones((5, 5))
    print(b)
    # [[1. 1. 1. 1. 1.]
    #  [1. 1. 1. 1. 1.]
    #  [1. 1. 1. 1. 1.],
    #  [1. 1. 1. 1. 1.],
    #  [1. 1. 1. 1. 1.]]
    c = np.full((3, 7), 5.0)
    print(c)
    #     [[5. 5. 5. 5. 5. 5. 5.]
    #      [5. 5. 5. 5. 5. 5. 5.]
    #      [5. 5. 5. 5. 5. 5. 5.]]
    d = np.eye(4)
    print(d)
    # [[1. 0. 0. 0.]
    #  [0. 1. 0. 0.]
    #  [0. 0. 1. 0.]
    #  [0. 0. 0. 1.]]
    e = np.linspace(0, 10, 3)
    print(e)
    # [ 0.  5. 10.]


def random_numbers():
    uniform = np.random.random((3, 2))  # uniform distribution
    normal_dist = np.random.randn(5)
    int_rand = np.random.randint(0, 5, size=(3, 3))
    choice = np.random.choice(3, size=10)
    print(uniform)
    print(normal_dist)
    print(int_rand)
    print(choice)


def find_eigenvalues():
    a = np.array([[1, 2], [3, 4]])
    eigenvalues, eigenvectors = np.linalg.eig(a)
    print(eigenvalues)
    print(eigenvectors)  # column vector


def solve_linear_system():
    A = np.array([[1.0, 1.0], [1.5, 4.0]])
    b = np.array([2200.0, 5050.0])
    inverse_A = np.linalg.inv(A)
    x = inverse_A.dot(b)
    print(x)
    x = np.linalg.solve(A, b)
    print(x)


def load_csv():
    data = np.loadtxt("spambase_csv.csv", delimiter=",", dtype=np.float32)
    print(data.shape)


if __name__ == "__main__":
    load_csv()
