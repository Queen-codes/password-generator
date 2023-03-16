import { useState } from "react";
// This imports useState hook from react

const generatePassword = (
  length: number,
  includeUppercase: boolean,
  includeNumbers: boolean,
  includeSymbols: boolean
) => {
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let charSet = lowercaseChars;
  if (includeUppercase) {
    charSet += uppercaseChars;
  }
  if (includeNumbers) {
    charSet += numberChars;
  }
  if (includeSymbols) {
    charSet += symbolChars;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charSet.length);
    password += charSet[randomIndex];
  }

  return password;
};

function App() {
  const [length, setLength] = useState<number>(8);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(false);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateClick = () => {
    setIsGenerating(true);
    const newPassword = generatePassword(
      length,
      includeUppercase,
      includeNumbers,
      includeSymbols
    );
    setPassword(newPassword);
    setIsGenerating(false);

    const strengthScore = calculatePasswordStrengthScore();
    const strengthMap: { [key: number]: string } = {
      0: "Very Weak",
      1: "Weak",
      2: "Fair",
      3: "Strong",
      4: "Very Strong",
    };
    setPasswordStrength(strengthMap[strengthScore]);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(password);
  };
  // function that handles the copy to clipboard function

  const handleLengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLength(parseInt(event.target.value));
  };
  // this handles the user input in terms of how long they want their password to be

  const handleIncludeUppercaseChange = () => {
    setIncludeUppercase(!includeUppercase);
  };
  // whether or not the user wants to include an uppercase letter

  const handleIncludeNumbersChange = () => {
    setIncludeNumbers(!includeNumbers);
  };

  //whether or not user wants to include numbers
  const handleIncludeSymbolsChange = () => {
    setIncludeSymbols(!includeSymbols);
  };

  const calculatePasswordStrengthScore = (): number => {
    let strengthScore = 0;
    if (includeUppercase) {
      strengthScore++;
    }
    if (includeNumbers) {
      strengthScore++;
    }
    if (includeSymbols) {
      strengthScore++;
    }
    if (length >= 12) {
      strengthScore++;
    }
    if (length >= 16) {
      strengthScore++;
    }
    return strengthScore;
  };

  // this is a function that returns a number which is a determinant of the password strenght score. The 'strength score variable is initially set to zero, which then increases based on the user choice on whether to include certain paramters in their passowrd.

  const determinePasswordStrength = (): string => {
    const strengthMap: { [key: number]: string } = {
      0: "Very Weak",
      1: "Weak",
      2: "Fair",
      3: "Strong",
      4: "Very Strong",
    };

    return passwordStrength || strengthMap[calculatePasswordStrengthScore()];
  };

  return (
    <>
      <main className="min-h-screen flex justify-center items-center bg-slate-900 font-mono">
        <section className=" p-6 rounded-lg shadow-md bg-slate-500">
          <h1 className="text-2xl text-center font-bold tracking-wide mb-6">
            Password Generator
          </h1>
          <div className="flex flex-col space-y-2 mb-3">
            <label htmlFor="password-length" className="text-sm font-medium">
              Password length:
            </label>
            <input
              type="number"
              id="password-length"
              value={length}
              onChange={handleLengthChange}
              className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <input
              type="checkbox"
              id="include-uppercase"
              checked={includeUppercase}
              onChange={handleIncludeUppercaseChange}
            />
            <label htmlFor="include-uppercase">Include uppercase letters</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="include-numbers"
              checked={includeNumbers}
              onChange={handleIncludeNumbersChange}
            />
            <label htmlFor="include-numbers">Include numbers</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="include-symbols"
              checked={includeSymbols}
              onChange={handleIncludeSymbolsChange}
            />
            <label htmlFor="include-symbols">Include symbols</label>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mb-4"
            disabled={isGenerating}
            onClick={handleGenerateClick}
          >
            {isGenerating ? "Generating..." : "Generate"}
          </button>
          {password && (
            <div>
              <p>
                <span className="font-bold text-lg">Password:</span> {password}
              </p>
              <button
                className="bg-blue-400 hover:bg-blue-500 text-white rounded-md py-2 px-3 mt-4 mb-4"
                onClick={handleCopyClick}
              >
                Copy to Clipboard
              </button>
              <section className=" bg-zinc-800 p-3 rounded text-yellow-50">
                <span className="text-xl">Strength:</span>{" "}
                {determinePasswordStrength()}
              </section>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default App;
