import React from 'react';

function PostDate(props)
{
    let months = ["January", "February", "March", "April", "May", "June", "July", "September", "October", "November", "December"]
    let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"]
    let FormatDate = () =>
    {
        let date = new Date(props.date);
        let hour = date.getHours() % 12;
        let ampm = hour >= 12 ? 'pm' : 'am'
        let minutes = date.getMinutes()
        minutes = minutes < 10 ? '0' + minutes : minutes;
        hour = hour ? hour : 12;
        return `${hour}:${minutes} ${ampm} - ${months[date.getMonth()]} ${date.getUTCDate()}, ${date.getFullYear()}`
    }
    return (
        <p>
            {FormatDate()}
        </p>
    )
}
export default PostDate;