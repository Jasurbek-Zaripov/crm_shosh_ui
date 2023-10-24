import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 80px;
    background: linear-gradient(270.31deg, #5A79E6 0.62%, #5778EE 95.42%);
    padding: 5px;
    border-radius:7px;
    @media only screen and (max-width:920px) {
    display: none;
    }
    select{
        background-color: transparent;
        color: white;
        padding: 2px 3px;
        border: none;
        cursor: pointer;
        outline: none;
    }
    select option{
        color: black;
    }
    a{
        background: #FFD700;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        text-transform: uppercase;
        color: #000000;
        padding-top: 18px;
        padding-bottom: 19px;
        padding-left: 41px;
        padding-right: 31px;
        text-decoration: none;
}
button{
    display: none;
}
@media only screen and (max-width: 1024px) {
    a{
        padding-top: 18px;
        padding-bottom: 19px;
        padding-left: 15px;
        padding-right: 14px;
}   
}
@media only screen and (max-width: 872px) {
    a{
        padding-top: 18px;
        padding-bottom: 19px;
        padding-left: 15px;
        padding-right: 14px;
    } 
    button{
        display: block;
        background-color: transparent;
        border: none;
    }
}
@media only screen and (max-width: 449px) {
    a{
        padding-top: 18px;
        padding-bottom: 19px;
        padding-left: 10px;
        padding-right: 9px;
        font-size: 18px;
    }
    select{
        background-color: transparent;
        color: white;
        padding: 3px 5px;
        border: none;
        cursor: pointer;
        outline: none;
    }
}
`
