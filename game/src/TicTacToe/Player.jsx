import { useState } from 'react';
import '../App.css';

export default function Player({initalName, symbol, isActive, onChangeName}) {
    const [playerName, setPlyerName] = useState(initalName);
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick() {
        setIsEditing((editing) => !editing);
        // 这个是函数式更新写法，它使用了 useState 提供的最新的状态值 editing。不依赖于外部的 isEditing 变量（可能是旧值）。保证你拿到的是React 内部“最新”的状态值。更安全、更健壮、适用于高频点击、并发模式、队列中状态更新的情况
        // 假设连续快速点击按钮两次，使用 setIsEditing(isEditing ? false : true); 两次都读取了“旧的” isEditing。可能两次都是 false → true → true（错误）
        // 使用 setIsEditing((editing) => !editing); 第一次 false → true。第二次 true → false。逻辑永远正确 ✔️

        if(isEditing)
        {
            onChangeName(symbol, playerName);
        }
    }

    function handleChange(event) {
        console.log(event);
        setPlyerName(event.target.value);
    }

    let editablePlayerName = <span className='player-name'>{playerName}</span>;
    // let btnCaption = 'Edit';  different way to change the button text, if true=Save, false=Edit

    if(isEditing) {
        editablePlayerName = <input type='text' required value={playerName} onChange={handleChange} />; // value绑定输入框的值  onChange每当输入变化时触发
        // btnCaption = 'Save';
    }
    return(
        <li className={isActive ? 'active' : undefined}>
            <span className='player'>
              {editablePlayerName}
              <span className='player-symbol'>{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
            </li>
    )
}