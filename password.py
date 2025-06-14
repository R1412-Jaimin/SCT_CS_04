import re
from colorama import Fore, Style, init

# Initialize colorama
init(autoreset=True)

def check_password_strength(password):
    criteria = {
        'length': len(password) >= 8,
        'uppercase': bool(re.search(r'[A-Z]', password)),
        'lowercase': bool(re.search(r'[a-z]', password)),
        'number': bool(re.search(r'[0-9]', password)),
        'special': bool(re.search(r'[^A-Za-z0-9]', password))
    }

    # Print detailed feedback
    print("\n🔍 Password Requirement Check:")
    for rule, passed in criteria.items():
        message = {
            'length': "At least 8 characters",
            'uppercase': "Contains uppercase letter",
            'lowercase': "Contains lowercase letter",
            'number': "Contains number",
            'special': "Contains special character (@, #, $, etc.)"
        }[rule]

        symbol = f"{Fore.GREEN}✔" if passed else f"{Fore.RED}✖"
        color = Fore.GREEN if passed else Fore.RED
        print(f"{symbol} {color}{message}")

    # Calculate score
    score = sum(criteria.values())
    print("\n📊 Password Strength:")

    if score <= 2:
        print(f"{Fore.RED}❗ Weak")
    elif score == 3 or score == 4:
        print(f"{Fore.YELLOW}⚠️  Moderate")
    else:
        print(f"{Fore.GREEN}✅ Strong")

def main():
    print(f"{Fore.CYAN}--- Password Strength Checker ---")
    password = input("🔐 Enter your password: ")
    check_password_strength(password)

if __name__ == "__main__":
    main()
