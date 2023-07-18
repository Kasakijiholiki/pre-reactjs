import React, { useEffect, useState } from "react";
import axios from "axios";

const TimeTable = () => {

    const [data, setData] = useState({})

    useEffect(() => {
        axios.get("http://localhost:8000/api/v1/grade/602e489d507db32d97b97ce4/4/1").then((res) => {
            if (res.data.success) {
                const data = res.data.data
                setData(data)

            }
        }).catch((err) => {
            console.log(err)
        })
    }, [])




    const Column = ({ data }) => {
        console.log("data")
        console.log(data)
        return (
            <div className="my-column-row even">
                {data.map((item) => {
                    return (
                        <div>
                            <p className="label">{item?.title}</p>
                            <span className="label">{"(FNS404)"}</span>
                        </div>
                    )
                })}

            </div>
        )
    }

    const Nothing = () => {

        return (
            <div className="nothing">
                <img className="icon" src="/empty.png" />
            </div>
        )
    }



    return (
        <div className="grid">
            <div style={{
                marginTop: "56px"
            }}>
                <div className="hour">
                    <p className="label">1</p>
                    <p className="label">Hello</p>
                </div>
                <div className="hour">
                    <p className="label">2</p>
                    <p className="label">Hello</p>
                </div>
                <div className="hour">
                    <p className="label">3</p>
                    <p className="label">Hello</p>
                </div>
                <div className="hour">
                    <p className="label">4</p>
                    <p className="label">Hello</p>
                </div>
                <div className="hour">
                    <p className="label">5</p>
                    <p className="label">Hello</p>
                </div>
            </div>
            <table className="my-table">
                <thead>
                    <tr>
                        <th className="my-column-header">Hour</th>
                        <th className="my-column-header">ຈັນ</th>
                        <th className="my-column-header">ອັງຄານ</th>
                        <th className="my-column-header">ພຸດ</th>
                        <th className="my-column-header">ພະຫັດ</th>
                        <th className="my-column-header">ສຸກ</th>
                        <th className="my-column-header">ເສົາ</th>
                        <th className="my-column-header">ອາທິດ</th>
                    </tr>
                </thead>
                <tbody>
                    {[data.monday, data.tuesday, data.wednesday, data.thursday, data.friday, data.saturday, data.sunday].map((dayData, index) => (
                        <tr key={index}>
                            {dayData &&
                                dayData.slice(1).map((item) => (
                                    <td key={item?._id}>
                                        {item ? (
                                            <Column data={item} />
                                        ) : (
                                            <Nothing />
                                        )}
                                    </td>
                                ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );



}


export default TimeTable
