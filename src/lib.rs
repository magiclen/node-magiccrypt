use digest::Digest;

use crc_any::CRCu64;
use md5::Md5;
use sha2::Sha256;
use tiger::Tiger;

use neon::prelude::*;

fn crc64we(mut cx: FunctionContext) -> JsResult<JsBuffer> {
    let value = cx.argument::<JsString>(0)?.value(&mut cx);

    let mut crc = CRCu64::crc64we();
    crc.digest(&value);

    let crc = crc.get_crc();

    let buffer = JsBuffer::external(&mut cx, crc.to_be_bytes());

    Ok(buffer)
}

fn md5(mut cx: FunctionContext) -> JsResult<JsBuffer> {
    let value = cx.argument::<JsString>(0)?.value(&mut cx);

    let mut md5 = Md5::default();
    md5.update(&value);

    let md5 = md5.finalize();

    let buffer = JsBuffer::external(&mut cx, md5);

    Ok(buffer)
}

fn tiger192(mut cx: FunctionContext) -> JsResult<JsBuffer> {
    let value = cx.argument::<JsString>(0)?.value(&mut cx);

    let mut tiger = Tiger::default();
    tiger.update(&value);

    let tiger = tiger.finalize();

    let buffer = JsBuffer::external(&mut cx, tiger);

    Ok(buffer)
}

fn sha256(mut cx: FunctionContext) -> JsResult<JsBuffer> {
    let value = cx.argument::<JsString>(0)?.value(&mut cx);

    let mut sha256 = Sha256::default();
    sha256.update(&value);

    let sha256 = sha256.finalize();

    let buffer = JsBuffer::external(&mut cx, sha256);

    Ok(buffer)
}

#[neon::main]
fn main(mut cx: ModuleContext) -> NeonResult<()> {
    cx.export_function("crc64we", crc64we)?;
    cx.export_function("md5", md5)?;
    cx.export_function("tiger192", tiger192)?;
    cx.export_function("sha256", sha256)?;

    Ok(())
}
