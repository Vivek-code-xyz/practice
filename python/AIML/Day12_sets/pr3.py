def truth_table_and_or():
    values = [0, 1]

    print("A B | AND OR")
    print("------------")

    for a in values:
        for b in values:
            print(f"{a} {b} |  {a & b}   {a | b}")


def truth_table_not():
    values = [0, 1]

    print("A | NOT")
    print("-------")

    for a in values:
        print(f"{a} |  {1 - a}")


truth_table_and_or()
truth_table_not()