import React from 'react';

function PostDate(props)
{
    let months = ["January", "February", "March", "April", "May", "June", "July", "September", "October", "November", "December"]
    let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"]
    let FormatDate = () =>
    {
        let date = new Date(props.date);
        let now = new Date();
        let timeElapsed =  (now.getTime() - date.getTime());
        let minutesElapsed = timeElapsed / 100000;
        let hoursElapsed = minutesElapsed / 60;

        let hour = date.getHours() % 12;
        let ampm = hour >= 12 ? 'am' : 'pm'
        let minutes = date.getMinutes()
        minutes = minutes < 10 ? '0' + minutes : minutes;
        hour = hour ? hour : 12;

        if (minutesElapsed < 1){
            return "Just now"
        }
        else if (minutesElapsed < 2){
            return `${Math.floor(minutesElapsed)} minute ago`
        }
        else if (minutesElapsed < 60){
            return `${Math.floor(minutesElapsed)} minutes ago`
        }
        else if (hoursElapsed < 24){
            return `${Math.floor(hoursElapsed)} hours ago`
        }
        return `${hour}:${minutes} ${ampm} - ${months[date.getMonth()]} ${date.getUTCDate()}, ${date.getFullYear()}`
    }
    return (
        <p>
            {FormatDate()}
        </p>
    )
}
export default PostDate;
