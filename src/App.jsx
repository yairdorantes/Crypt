import { useState, useEffect } from "react";
import "./App.css";
import CryptoJS from "crypto-js";

function App() {
  const [text, setText] = useState("");
  const [encryptedText, setEncryptedText] = useState("");
  const [decryptedText, setDecryptedText] = useState("");
  const [stepEncrypted, setStepEncrypted] = useState("");

  useEffect(() => {
    if (encryptedText !== "") {
      const secretKey = "1";
      const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
      setDecryptedText(bytes.toString(CryptoJS.enc.Utf8));
    }
    stepByStep();
  }, [encryptedText]);
  const stepByStep = () => {
    console.log(stepEncrypted.length);
    setStepEncrypted("");
    for (let i = 0; i < encryptedText.length; i++) {
      setTimeout(() => {
        setStepEncrypted((stepEncrypted) => stepEncrypted + encryptedText[i]);
      }, i * 30);
    }
  };

  const crypting = () => {
    console.log(text);
    navigator.clipboard.writeText("holaaaaa");

    if (text !== "") {
      const secretKey = "1";
      const plaintext = text;
      // Encrypting the plaintext
      const crypted = CryptoJS.AES.encrypt(plaintext, secretKey).toString();
      // setStepEncrypted(crypted);
      setEncryptedText(crypted);
    } else {
      alert("Agrega tu texto");
    }
  };
  const copyCrypting = () => {
    navigator.clipboard.writeText(encryptedText);
  };

  return (
    <>
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
        <input
          type="text"
          placeholder="type here"
          className="input input-bordered"
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="btn btn-lg ml-2 btn-success"
          disabled={stepEncrypted.length !== encryptedText.length}
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

      {/* <p className="mt-2">
        Texto encriptado: <span className="font-bold">{encryptedText}</span>
      </p> */}

      <div className="mockup-code  mx-auto mt-10 flex flex-col flex-s items-start">
        <pre data-prefix="$" className="">
          <code>Crypto</code>
        </pre>
        <pre data-prefix=">" className="text-warning ">
          <code>Generando...</code>
        </pre>
        <pre data-prefix=">" className="text-success">
          {/* <code className="">{encryptedText}</code> */}
          <code>{stepEncrypted}</code>
        </pre>
      </div>
      {/* <button className="btn" onClick={stepByStep}>
        btn
      </button> */}
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
