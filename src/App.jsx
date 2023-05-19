import { useState, useEffect } from "react";
import "./App.css";

import CryptoJS from "crypto-js";
import { Toaster, toast } from "react-hot-toast";
function App() {
  const [text, setText] = useState("");
  const [encryptedText, setEncryptedText] = useState("");
  const [decryptedText, setDecryptedText] = useState("");
  const [stepEncrypted, setStepEncrypted] = useState("");
  const [decryptByStep, setDecryptByStep] = useState("");
  const [textDecrypt, setTextDecrypt] = useState("");

  useEffect(() => {
    stepByStep(encryptedText, setStepEncrypted);
  }, [encryptedText]);

  const stepByStep = (text, changeState) => {
    setStepEncrypted("");
    setDecryptByStep("");
    for (let i = 0; i < text.length; i++) {
      setTimeout(() => {
        changeState((state) => state + text[i]);
      }, i * 30);
    }
  };

  useEffect(() => {
    stepByStep(decryptedText, setDecryptByStep);
  }, [decryptedText]);

  const decrypt = (crypt_text) => {
    setEncryptedText("");
    console.log(decryptedText);
    const secretKey = "1";
    const bytes = CryptoJS.AES.decrypt(crypt_text, secretKey);
    try {
      const finalDecrypt = bytes.toString(CryptoJS.enc.Utf8);
      finalDecrypt.length === 0
        ? toast.error("Sin resultados")
        : setDecryptedText(finalDecrypt);
    } catch (err) {
      console.log(err);
      toast.error("sin resultados");
    }
    setText("");
    setEncryptedText("");
  };

  const crypting = () => {
    if (text !== "") {
      setTextDecrypt("");
      const secretKey = "1";
      const plaintext = text;
      // Encrypting the plaintext
      const crypted = CryptoJS.AES.encrypt(plaintext, secretKey).toString();
      // setStepEncrypted(crypted);
      setEncryptedText(crypted);
      setDecryptByStep("");
      setDecryptedText("");
    } else {
      toast.error("Agrega Text");
    }
  };
  const copyCrypting = () => {
    navigator.clipboard.writeText(encryptedText);
    toast.success("Texto encriptado 🔑 se ha copiado");
  };

  return (
    <>
      <Toaster />
      <div className="text-2xl"></div>
      <div className="mb-5">
        <a
          className="link link-info font-bold"
          href={"https://es.wikipedia.org/wiki/Advanced_Encryption_Standard"}
        >
          AES
        </a>
      </div>
      {/* <p className="font-bold">Decrypted text: {decryptedText}</p> */}
      <div className="flex items-center justify-center">
        <button onClick={() => setText("")}>
          <svg
            fill="none"
            viewBox="0 0 15 15"
            height="1em"
            width="1em"
            className="w-6 h-6 mr-2"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M.877 7.5a6.623 6.623 0 1113.246 0 6.623 6.623 0 01-13.246 0zM7.5 1.827a5.673 5.673 0 100 11.346 5.673 5.673 0 000-11.346zm2.354 3.32a.5.5 0 010 .707L8.207 7.5l1.647 1.646a.5.5 0 01-.708.708L7.5 8.207 5.854 9.854a.5.5 0 01-.708-.708L6.793 7.5 5.146 5.854a.5.5 0 01.708-.708L7.5 6.793l1.646-1.647a.5.5 0 01.708 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <input
          type="text"
          placeholder="Encriptar..."
          className="input input-bordered"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="btn btn-lg ml-2 btn-success"
          disabled={
            stepEncrypted.length !== encryptedText.length ||
            decryptByStep.length !== decryptedText.length
          }
          onClick={crypting}
        >
          <svg
            className="w-10 h-10"
            viewBox="0 0 24 24"
            fill="currentColor"
            height="1em"
            width="1em"
          >
            <path d="M11.991 0a.883.883 0 00-.871.817v3.02a.883.883 0 00.88.884.883.883 0 00.88-.88V.816A.883.883 0 0011.991 0zm7.705 3.109a.88.88 0 00-.521.174L16.8 5.231a.88.88 0 00.559 1.563.88.88 0 00.56-.2l2.37-1.951a.88.88 0 00-.594-1.534zM4.32 3.122a.883.883 0 00-.611 1.52l2.37 1.951a.876.876 0 00.56.2v-.002a.88.88 0 00.56-1.56L4.828 3.283a.883.883 0 00-.508-.16zm7.66 3.228a5.046 5.046 0 00-5.026 5.045v1.488H5.787a.967.967 0 00-.965.964v9.189a.967.967 0 00.965.964h12.426a.967.967 0 00.964-.964v-9.19a.967.967 0 00-.964-.963h-1.168v-1.488A5.046 5.046 0 0011.98 6.35zm.012 2.893a2.152 2.152 0 012.16 2.152v1.488H9.847v-1.488a2.152 2.152 0 012.145-2.152zm7.382.503a.883.883 0 10.07 1.763h3.027a.883.883 0 000-1.76h-3.027a.883.883 0 00-.07-.003zM1.529 9.75a.883.883 0 000 1.76h2.999a.883.883 0 000-1.76zm10.46 6.774a1.28 1.28 0 01.64 2.393v1.245a.63.63 0 01-1.259 0v-1.245a1.28 1.28 0 01.619-2.393z" />
          </svg>
        </button>
      </div>

      <div className="flex items-center justify-center mt-10">
        <button onClick={() => setTextDecrypt("")}>
          <svg
            fill="none"
            viewBox="0 0 15 15"
            height="1em"
            width="1em"
            className="w-6 h-6 mr-2"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M.877 7.5a6.623 6.623 0 1113.246 0 6.623 6.623 0 01-13.246 0zM7.5 1.827a5.673 5.673 0 100 11.346 5.673 5.673 0 000-11.346zm2.354 3.32a.5.5 0 010 .707L8.207 7.5l1.647 1.646a.5.5 0 01-.708.708L7.5 8.207 5.854 9.854a.5.5 0 01-.708-.708L6.793 7.5 5.146 5.854a.5.5 0 01.708-.708L7.5 6.793l1.646-1.647a.5.5 0 01.708 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <input
          type="text"
          placeholder="Desencriptar..."
          className="input input-bordered"
          value={textDecrypt}
          onChange={(e) => setTextDecrypt(e.target.value)}
        />
        <button
          className="btn btn-lg ml-2 btn-info"
          disabled={
            stepEncrypted.length !== encryptedText.length ||
            (decryptByStep.length !== decryptedText.length &&
              decryptedText !== "")
          }
          // disabled={stepEncrypted.length !== encryptedText.length}
          onClick={() => decrypt(textDecrypt)}
        >
          <svg
            viewBox="0 0 1024 1024"
            fill="currentColor"
            height="1em"
            width="1em"
            className="w-10 h-10"
          >
            <path d="M688 312v-48c0-4.4-3.6-8-8-8H296c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h384c4.4 0 8-3.6 8-8zm-392 88c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H296zm144 452H208V148h560v344c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V108c0-17.7-14.3-32-32-32H168c-17.7 0-32 14.3-32 32v784c0 17.7 14.3 32 32 32h272c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm445.7 51.5l-93.3-93.3C814.7 780.7 828 743.9 828 704c0-97.2-78.8-176-176-176s-176 78.8-176 176 78.8 176 176 176c35.8 0 69-10.7 96.8-29l94.7 94.7c1.6 1.6 3.6 2.3 5.6 2.3s4.1-.8 5.6-2.3l31-31a7.9 7.9 0 000-11.2zM652 816c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" />
          </svg>
        </button>
      </div>

      <div className="mockup-code  mx-auto mt-10 flex flex-col flex-s items-start">
        <pre data-prefix="$" className="">
          <code>Crypto 🔑 </code>
        </pre>
        <pre data-prefix=">" className="text-warning ">
          <code>Generando...</code>
        </pre>
        <pre data-prefix=">" className="text-success ">
          <code>{stepEncrypted}</code>
          <code>{decryptByStep}</code>
        </pre>
      </div>

      <div onClick={copyCrypting}>
        <svg
          className="w-8 h-8 cursor-pointer m-2 active:w-6"
          viewBox="0 0 24 24"
          fill="currentColor"
          height="1em"
          width="1em"
        >
          <path d="M14 8H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V10c0-1.103-.897-2-2-2z" />
          <path d="M20 2H10a2 2 0 00-2 2v2h8a2 2 0 012 2v8h2a2 2 0 002-2V4a2 2 0 00-2-2z" />
        </svg>
      </div>
    </>
  );
}

export default App;
