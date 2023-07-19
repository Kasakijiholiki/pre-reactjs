import React, { useEffect, useState } from "react";
import axios from "axios";

const TimeTable = () => {

    const [data, setData] = useState({})

    useEffect(() => {
        axios.get("http://localhost:8000/api/v1/grade/602e489d507db32d97b97ce4/4/1").then((res) => {
            if (res.data.success) {
                const data = res.data.data
                setData(data)
                console.log(data)
            }
        }).catch((err) => {
            console.log(err)
        })
    }, [])




    const Column = ({ data, day }) => {

        return (
            <div className=" my-column-row">
                {data.map((item) => {
                    let week = "none"
                    item?.timesStudy.map((time) => {
                        if (day === time?.day) {
                            if (time.oddWeek) {
                                week = "odd"
                            }
                            else if (time.evenWeek) {
                                week = "even"
                            }
                            else if (time.allWeek) {
                                week = "all"
                            }
                        }
                    })

                    return (
                        <div className={week + " center"}>
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
                    <td>
                        {data.monday && data?.monday.slice(1).map((monday) => {
                            if (monday)
                                return (
                                    <Column data={monday || []} day={"ຈັນ"} />
                                )
                            else return <Nothing />
                        })}
                    </td>
                    <td>
                        {data.tuesday && data?.tuesday.slice(1).map((tuesday) => {
                            if (tuesday)
                                return (
                                    <Column data={tuesday || []} day={"ອັງຄານ"} />
                                )
                            else return <Nothing />
                        })}
                    </td>

                    <td>
                        {data.wednsday && data?.wednsday.slice(1).map((wednsday) => {
                            if (wednsday)
                                return (
                                    <Column data={wednsday || []} day={"ພຸດ"} />
                                )
                            else return <Nothing />
                        })}
                    </td>
                    <td>
                        {data.thursday && data?.thursday.slice(1).map((thursday) => {
                            if (thursday)
                                return (
                                    <Column data={thursday || []} day={"ພະຫັດ"} />
                                )
                            else return <Nothing />
                        })}
                    </td>
                    <td>
                        {data.friday && data?.friday.slice(1).map((friday) => {
                            if (friday)
                                return (
                                    <Column data={friday || []} day={"ສຸກ"} />
                                )
                            else return <Nothing />
                        })}
                    </td>
                    <td>
                        {data.saturday && data?.saturday.slice(1).map((saturday) => {
                            if (saturday)
                                return (
                                    <Column data={saturday || []} day={"ເສົາ"} />
                                )
                            else return <Nothing />
                        })}
                    </td>
                    <td>
                        {data.sunday && data?.sunday.slice(1).map((sunday) => {
                            if (sunday)
                                return (
                                    <Column data={sunday || []} day={"ອາທິດ"} />
                                )
                            else return <Nothing />
                        })}
                    </td>


                    {/* {[data.monday, data.tuesday, data.wednesday, data.thursday, data.friday, data.saturday, data.sunday].map((dayData, index) => (
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
                    ))} */}
                </tbody>
            </table>
        </div>
    );



}


export default TimeTable
