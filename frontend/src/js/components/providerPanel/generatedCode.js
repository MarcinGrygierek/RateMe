import React from 'react';
import QRCode from 'qrcode.react';

const GeneratedCode = (props) => {
    return (
        <section className="QRCode">
            <QRCode size="512" value="http://facebook.github.io/react/" />
        </section>
    );
};

export default GeneratedCode;