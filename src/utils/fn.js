import CryptoJS from "./aes"
import Button from "@component/buttons/Button";


export const MyButton = (value) => {
	return <Button color="primary" bg="primary.light" px="2rem">
		{value.text}
	</Button>;

}



export const crypt = (value) => {
	const keyCodeWords = CryptoJS.enc.Hex.parse("3736623936336663383330323737623861656132363438373539353264303962");
	const ivCodeWords = CryptoJS.enc.Hex.parse("48633172415a76776175794f73635a33");
	let crypt = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value), keyCodeWords, {
		iv: ivCodeWords,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7
	});
	crypt = crypt.toString();
	return crypt;
};

export const decrypt = (value) => {

	const keyCodeWords = CryptoJS.enc.Hex.parse("3736623936336663383330323737623861656132363438373539353264303962");
	const ivCodeWords = CryptoJS.enc.Hex.parse("48633172415a76776175794f73635a33");
	const crypt = CryptoJS.AES.decrypt(value.toString(), keyCodeWords, {
		iv: ivCodeWords,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7
	});
	const a = crypt.toString();
	const b = crypt.toString(CryptoJS.enc.Utf8)//CryptoJS.enc.Utf8.stringify(crypt.toString());
	return b;
};





