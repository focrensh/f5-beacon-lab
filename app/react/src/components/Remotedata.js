import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { Button } from 'reactstrap';


function Remotedata() {
    const [btndata, setbtndata] = useState({
        loading: false,
        data: null
    })

    let content = null


    // useEffect(() => {
    //     setbtndata({
    //         loading: true,
    //         data: null
    //     })
    //     axios.get('http://localhost:3002/declare')
    //         .then(response => {
    //             setbtndata({
    //                 loading: false,
    //                 data: response.data
    //             })
    //         })
    // }, [])

    const runit = () => {
        setbtndata({
            loading: true,
            data: null
        })
        axios.get('http://localhost:3000/declare')
            .then(response => {
                setbtndata({
                    loading: false,
                    data: JSON.stringify(response.data)
                })
                console.log(response.data)
            })
    }

    if(btndata.data){
        content = 
        <div>{btndata.data}</div>
    }


    // if(showMenu){
    //     menu = <div className="fixed bg-white top-0 left-0 w-4/5 h-full z-50 shadow">This is the MENU</div>

    //     menuMask = 
    //     <div className="bg-black-t-50 fixed top-0 left-0 w-full h-full z-50"></div>
    // }
    return (
        <div> 
            <Button color="secondary" onClick={() => runit()}>GetData</Button>
            {content}
        </div>
    )
}

export default Remotedata
