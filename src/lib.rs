use magic_crypt::{MagicCrypt, MagicCryptTrait, SecureBit};
use napi::{
    Error, Result, Status,
    bindgen_prelude::{Buffer, BufferSlice},
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
            _ => return Err(Error::new(Status::InvalidArg, "Unsupported key size")),
        };

        // An empty IV means zero bytes, not the hash of an empty string.
        let iv = if iv.is_empty() { None } else { Some(iv) };

        Ok(Self {
            inner: MagicCrypt::new(key, bit, iv)
        })
    }

    #[napi]
    pub fn encrypt(&self, data: BufferSlice<'_>) -> Buffer {
        self.inner.encrypt_to_bytes(data.as_ref()).into()
    }

    #[napi]
    pub fn decrypt(&self, data: BufferSlice<'_>) -> Result<Buffer> {
        self.inner
            .decrypt_bytes_to_bytes(data.as_ref())
            .map(Buffer::from)
            .map_err(|error| Error::new(Status::InvalidArg, error.to_string()))
    }
}
