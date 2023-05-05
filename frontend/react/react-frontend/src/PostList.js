import React, { useState, useEffect } from 'react';

export const PostList = () => {
    const[image, setImage] = useState([])
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/photos')
            .then(response => response.json())
            .then(data => setImage(data))
            .catch(err => console.log(err))
    },[])

    return (
        <div>
            <ul>
                {
                    image.map(image => {
                        return <li key={image.id}>
                            <img src={image.url} alt={image.title}></img>
                        </li>
                    })
                }
            </ul>
        </div>
    );
}
