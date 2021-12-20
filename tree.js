const assert = require("assert");

const supportedOperations = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "x": (a, b) => a * b,
    "÷": (a, b) => a / b
}

const Node = (operator, value, left, right) => {
    const result = function () {
        const operation = supportedOperations[this.operator]
        if (operation) {
            const leftInput = left.result();
            const rightInput = right.result();
            const operationResult = operation(leftInput, rightInput)
            if (operationResult === Infinity || operationResult === NaN ) {
                const errorMessage = `Operation '${this.operator}' not supported with input values ${leftInput} and ${rightInput}`
                throw new Error(errorMessage)
            }
            return operationResult;
        }
        return value
    };

    const toString = function () {
        return Object.keys(supportedOperations).includes(this.operator) ?
            `(${left.toString()} ${this.operator} ${right.toString()})` :
            value.toString();
    };

    return {
        operator,
        value,
        left,
        right,
        result,
        toString
    };
};

const tree = Node(
    "÷",
    null,
    Node(
        "+",
        null,
        Node("", 7, null, null),
        Node(
            "x",
            null,
            Node("-", null, Node("", 3, null, null), Node("", 2, null, null)),
            Node("", 5, null, null)
        )
    ),
    Node("", 6, null, null)
);

assert.strictEqual("((7 + ((3 - 2) x 5)) ÷ 6)", tree.toString());
assert.strictEqual(2, tree.result());

const tree2 = Node("÷", null, Node("", 3, null, null) , Node("", 0, null, null),)
assert.throws(() => tree2.result())

