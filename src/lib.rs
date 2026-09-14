use magic_crypt::{MagicCrypt, MagicCryptError, MagicCryptTrait, SecureBit};
use napi::{
    Error, Result, Status,
    bindgen_prelude::{Buffer, Uint8ArraySlice},
};
use napi_derive::napi;

#[napi]
pub struct NativeMagicCrypt {
    inner: MagicCrypt,
}

#[napi]
impl NativeMagicCrypt {
    #[napi(constructor)]
    pub fn new(key: String, bit: u32, iv: String) -> Result<Self> {
        let bit = match bit {
            64 => SecureBit::Bit64,
            128 => SecureBit::Bit128,
            192 => SecureBit::Bit192,
            256 => SecureBit::Bit256,
            _ => {
                return Err(Error::new(Status::InvalidArg, "The bit must be 64, 128, 192 or 256"));
            },
        };

        // An empty IV means zero bytes, not the hash of an empty string.
        let iv = if iv.is_empty() { None } else { Some(iv) };

        Ok(Self {
            inner: MagicCrypt::new(key, bit, iv)
        })
    }

    /// Encrypts the data and returns it as a Base64 string.
    #[napi]
    pub fn encrypt(&self, data: Uint8ArraySlice<'_>) -> String {
        self.inner.encrypt_to_base64(data.as_ref())
    }

    /// Decrypts a Base64 string and returns the raw bytes.
    #[napi]
    pub fn decrypt(&self, data: String) -> Result<Buffer> {
        self.inner.decrypt_base64_to_bytes(&data).map(Buffer::from).map_err(into_napi_error)
    }

    /// Decrypts a Base64 string and returns the bytes decoded as UTF-8.
    #[napi]
    pub fn decrypt_to_string(&self, data: String) -> Result<String> {
        self.inner.decrypt_base64_to_string(&data).map_err(into_napi_error)
    }
}

#[inline]
fn into_napi_error(error: MagicCryptError) -> Error {
    Error::new(Status::InvalidArg, format!("failed to decrypt the data: {error}"))
}
