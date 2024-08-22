public class CalculatorClass {
	// Addition method
    public static Integer add(Integer num1, Integer num2) {
        integer result = num1 + num2;
        return result;
    }

    // Subtraction method
    public static Integer subtract(Integer num1, Integer num2) {
        return num1 - num2;
    }

    // Multiplication method
    public static Integer multiply(Integer num1, Integer num2) {
        return num1 * num2;
    }

    // Division method
    public static Decimal divide(Integer num1, Integer num2) {
        if (num2 == 0) {
            throw new System.MathException('Division by zero is not allowed');
        }
        return num1 / num2;
    }
}