
const go = new Go();
export const InitWasm = async () => {
  const response = await fetch('/main.wasm');
  const buffer = await response.arrayBuffer();
  const module = await WebAssembly.instantiate(buffer, go.importObject);
  go.run(module.instance);
};

export const httpSign = (url, query, method, body) => {
  let result;
  try {
    result = window?.httpSign(url, query, method, body);
  } catch (e) {
    console.log(e);
    result = '';
  }
  return result;
};
