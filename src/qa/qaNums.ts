// Qaの子関数。数字が正しく使われているかをチェックする

export const qaNum: QAfuncCB = (src: string, tgt: string, params: any): Promise<QaResultInfo[]> => {
    return new Promise((resolve, reject) => {
        const reg = new RegExp('[0-9]+', 'g')
        const st = params
            ? params.toNormalize
                ? src.normalize("NFKC") : src
            : src;
        const tt = params
            ? params.toNormalize
                ? tgt.normalize("NFKC") : tgt
            : tgt;
        const nResults: QaResultInfo[] = [];
        const nss: string[] = st.match(reg) || [];
        const nts: string[] = tt.match(reg) || [];
        for (const ns of nss) {
            const hitInT = nts.indexOf(ns);
            if (hitInT === -1) {
                nResults.push({
                    errtype: 'Number',
                    sInfo: ns,
                    tInfo: '_',
                });
            } else {
                nts.splice(hitInT, 1);
            }
        }
        if (nts.length > 0) {
            for (const nt of nts) {
                nResults.push({
                    errtype: 'Number',
                    sInfo: '_',
                    tInfo: nt,
                });
            }
        }
        resolve(nResults);
    });
}

