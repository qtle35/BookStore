import React, {  useState } from 'react';
// import DetectLanguage from 'detectlanguage';

function DetectLanguage() {
    var DetectLanguage = require('detectlanguage');
    const [text, setText] = useState('')
    const [loading, setLoading] = useState(false)

    var detectlanguage = new DetectLanguage('89e3ba451bcce8454b4fe5f030d496bb');
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        detectlanguage.detectCode(text).then(function (result) {
            setLoading(false)
            console.log(result);
            alert(result)
        });
        

        
    }
    if (loading) {
        return <p>Loading...</p>
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input onInput={e => setText(e.target.value)} />
            </form>

        </div>
    );

}

export default DetectLanguage;