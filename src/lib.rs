use crc_any::CRCu64;
use digest::Digest;
use md5::Md5;
use napi::{bindgen_prelude::*, JsBuffer};
use napi_derive::napi;
use sha2::Sha256;
use tiger::Tiger;

#[napi]
pub fn crc64we(env: Env, s: String) -> Result<JsBuffer> {
    let mut crc = CRCu64::crc64we();
    crc.digest(s.as_str());

    let crc = crc.get_crc();

    let buffer = env.create_buffer_with_data(crc.to_be_bytes().to_vec())?;

    Ok(buffer.into_raw())
}

#[napi]
pub fn md5(env: Env, s: String) -> Result<JsBuffer> {
    let mut md5 = Md5::default();
    md5.update(s.as_str());

    let md5 = md5.finalize();

    let buffer = env.create_buffer_with_data(md5.to_vec())?;

    Ok(buffer.into_raw())
}

#[napi]
pub fn tiger192(env: Env, s: String) -> Result<JsBuffer> {
    let mut tiger = Tiger::default();
    tiger.update(s.as_str());

    let tiger = tiger.finalize();

    let buffer = env.create_buffer_with_data(tiger.to_vec())?;

    Ok(buffer.into_raw())
}

#[napi]
pub fn sha256(env: Env, s: String) -> Result<JsBuffer> {
    let mut sha256 = Sha256::default();
    sha256.update(s.as_str());

    let sha256 = sha256.finalize();

    let buffer = env.create_buffer_with_data(sha256.to_vec())?;

    Ok(buffer.into_raw())
}
