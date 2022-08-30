declare type QAfuncCB = (src: string, tgt: string, ...rest: any) => Promise<QaResultInfo[]>;

declare interface QaInfo {
    st: string;
    tt: string;
    results: QaResultInfo[];
}

// Qaエラーの結果を保存するインターフェース
// errtypeには用語違い、数字違いなどの情報が入る
// sInfo tInfoにはエラーの具体的な内容が入る
declare interface QaResultInfo {
    errtype: string;
    sInfo: string;
    tInfo: string;
}