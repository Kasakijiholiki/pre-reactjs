import React, { useEffect, useState } from "react";
import axios from "axios";

const TeacherTimeTable = () => {



    const [dataTable, setDataTable] = useState({})
    const [timeList, setTineList] = useState([])

    const [courseDetail, setCourseDetail] = useState()
    const [showCourse, setShowCourse] = useState(false)


    const [selectedYear, setSelectedYear] = useState(1); // State to store the selected option
    const [selectedSemester, setSelectedSemester] = useState(1); // State to store the selected option


    useEffect(() => {

        axios.get("http://localhost:8000/api/v1/teacher/6283448d24aa9a00082f8e13/" + selectedYear + "/" + selectedSemester).then((res) => {
            if (res.data.success) {
                const data = res.data.data
                setDataTable(data)
                console.log("Hey here is your data")
                console.log(data)
            }
            else {
                console.log("data not found")
                setDataTable([])
            }
        }).catch((err) => {
            setDataTable([])

        })


        axios.get("http://localhost:8000/api/v1/time/636cad7dcb5e606698a243e4").then((res) => {
            if (res.data.success) {
                const data = res.data.data
                setTineList(data)
                console.log(data)
            }
        }).catch((err) => {
            console.log(err)
        })

    }, [selectedYear, selectedSemester])




    const Column = ({ data, day }) => {
        return (
            <div className=" my-column-row">
                {data.map((item) => {

                    console.log("item")

                    console.log(item.faculty)
                    let week = ""
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
                        <div
                            onClick={() => {

                                let times = ""
                                item.timesStudy.forEach((d, index) => {
                                    d.times.forEach((time, timeIndex) => {
                                        times += time?.time;
                                        if (index !== item.timesStudy.length - 1 || timeIndex !== d.times.length - 1) {
                                            times += " ແລະ ";
                                        }
                                    });
                                });


                                let w = ""
                                if (week == "odd") w = "ອາທິດຄີກ"
                                else if (week == "even") w = "ອາທິດຄີກ"
                                else if (week === "all") w = "ທຸກອາທິດ"


                                setCourseDetail({
                                    title: item?.title,
                                    description: item?.description,
                                    week: w,
                                    times: times,
                                    facName: item?.faculty,
                                    addressLearn: item?.addressLearn || "ບໍ່ມິຂໍ້ມຸນ"
                                })
                                setShowCourse(true)

                            }}
                            className={week + " mycenter"}>
                            <p className="mylabel">{item?.title}</p>
                            {item.addressLearn && (
                                <span className="mylabel">{"(" + item?.addressLearn || "" + ")"} </span>
                            )}
                        </div>

                    )
                })}

            </div>
        )
    }

    const Nothing = () => {
        return (
            <div className="nothing">
            </div>
        )
    }






    const handleYearChange = (event) => {
        setSelectedYear(event.target.value); // Update the selected option when the user selects a new value
    };

    const handleSemesterChange = (event) => {
        setSelectedSemester(event.target.value); // Update the selected option when the user selects a new value
    };


    return (
        <div className="content">
            <div className="new-row">
                <select
                    className="form-select px-5 mx-4 py-2 mt-4 me-5"
                    aria-label="Default select example"
                    value={selectedYear} // Set the value of the select element based on the state
                    onChange={handleYearChange} // Add an onChange event handler to update the state when the user selects an option
                >
                    <option selected>ປິຮຽນ</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>

                <select
                    value={selectedSemester} // Set the value of the select element based on the state
                    onChange={handleSemesterChange} // Add an onChange event handler to update the state when the user selects an option
                    className="form-select px-5 mx-4 py-2 mt-4 me-5"
                    aria-label="Default select example">
                    <option selected>ພາກຮຽນ</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>



                <div style={{ marginLeft: "100px", marginRight: "40px" }} className="content">
                    <div className="round-even" />
                    <p>ອາທິດຄຸ່</p>
                </div>
                <div style={{ marginRight: "40px" }} className="content">
                    <div className="round-odd" />
                    <p>ອາທິດຄີກ</p>
                </div>
                <div style={{ marginRight: "40px" }} className="content">
                    <div className="round-all" />
                    <p>ທຸກອາທິດ</p>
                </div>




                {showCourse && (
                    <div className="my-modal">
                        <div className="modal-content w-25 m-0 mt-5 bg-white p-0 pt-3 pb-3">
                            <h5 className="mb-4">ລະລະອຽດລາຍວິຊາ</h5>
                            <div className="text-start">
                                <p>ຊື່ວິຊາ: {courseDetail.title}</p>
                                <p>ຄຳອະທິບາຍ: {courseDetail.description || "ບໍ່ມິຂໍ້ມຸນ"}</p>
                                <p>ອາທິດຮຽນ: {courseDetail.week}</p>
                                <p>ເວລາສອນ: {courseDetail.times}</p>
                                <p>ສະຖານທີສອນ: {courseDetail.addressLearn || "ບໍ່ມິຂໍ້ມຸນ"}</p>
                                <p>ຕະນະ: {courseDetail.facName || "ບໍ່ມີຂໍ້ມຸນ"}</p>
                            </div>
                            <button onClick={() => setShowCourse(false)} type="button" className="btn btn-primary px-5">ປິດ</button>
                        </div>
                    </div>
                )}




            </div>
            <div className="grid">
                <div style={{
                    marginTop: "70px"
                }}>
                    <div className="hour">
                        <p className="label">{"ຊົ່ວໂມງ 1"}</p>
                    </div>
                    <div className="hour">
                        <p className="label">{"ຊົ່ວໂມງ 2"}</p>
                    </div>
                    <div className="hour">
                        <p className="label">{"ຊົ່ວໂມງ 3"}</p>
                    </div>
                    <div className="hour">
                        <p className="label">{"ຊົ່ວໂມງ 4"}</p>
                    </div>
                    <div className="hour">
                        <p className="label">{"ຊົ່ວໂມງ 5"}</p>
                    </div>
                    <div className="hour">
                        <p className="label">{"ຊົ່ວໂມງ 6"}</p>
                    </div>
                    <div className="hour">
                        <p className="label">{"ຊົ່ວໂມງ 7"}</p>
                    </div>
                    <div className="hour">
                        <p className="label">{"ຊົ່ວໂມງ 8"}</p>
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
                            {dataTable.monday && dataTable?.monday.slice(1).map((monday) => {
                                if (monday)
                                    return (
                                        <Column data={monday || []} day={"ຈັນ"} />
                                    )
                                else return <Nothing />
                            })}
                        </td>
                        <td>
                            {dataTable.tuesday && dataTable?.tuesday.slice(1).map((tuesday) => {
                                if (tuesday)
                                    return (
                                        <Column data={tuesday || []} day={"ອັງຄານ"} />
                                    )
                                else return <Nothing />
                            })}
                        </td>

                        <td>
                            {dataTable.wednsday && dataTable?.wednsday.slice(1).map((wednsday) => {
                                if (wednsday)
                                    return (
                                        <Column data={wednsday || []} day={"ພຸດ"} />
                                    )
                                else return <Nothing />
                            })}
                        </td>
                        <td>
                            {dataTable.thursday && dataTable?.thursday.slice(1).map((thursday) => {
                                if (thursday)
                                    return (
                                        <Column data={thursday || []} day={"ພະຫັດ"} />
                                    )
                                else return <Nothing />
                            })}
                        </td>
                        <td>
                            {dataTable.friday && dataTable?.friday.slice(1).map((friday) => {
                                if (friday)
                                    return (
                                        <Column data={friday || []} day={"ສຸກ"} />
                                    )
                                else return <Nothing />
                            })}
                        </td>
                        <td>
                            {dataTable.saturday && dataTable?.saturday.slice(1).map((saturday) => {
                                if (saturday)
                                    return (
                                        <Column data={saturday || []} day={"ເສົາ"} />
                                    )
                                else return <Nothing />
                            })}
                        </td>
                        <td>
                            {dataTable.sunday && dataTable?.sunday.slice(1).map((sunday) => {
                                if (sunday)
                                    return (
                                        <Column data={sunday || []} day={"ອາທິດ"} />
                                    )
                                else return <Nothing />
                            })}
                        </td>
                    </tbody>
                </table>
            </div>
        </div>

    );



}


export default TeacherTimeTable
