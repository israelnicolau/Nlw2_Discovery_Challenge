module.exports = async function(db, {proffyValue, classValue, classScheduleValue}){
    //insnerir dados na tabela de proffys
    const insertedProffy = await db.run(`
        INSERT INTO proffys(
            name,
            avatar,
            whatsapp,
            bio
        )VALUES(
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `)
    const proffy_id = insertedProffy.lastID

    //inserir dados nan tabela classes

    const insertedClass = await db.run(`
            INSERT INTO classes (
                subject,
                cost,
                proffy_id
            ) VALUES (
               "${classValue.subject}",
               "${classValue.cost}",
               "${proffy_id}"
            );
    `)

    const class_id = insertedClass.lastID

    //inserir dados nan tabela class_schedule
    const insertedAllClassScheduleValues = classScheduleValue.map((value)=>{
        return db.run(`
            INSERT INTO class_schedule(
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${value.weekday}",
                "${value.time_from}",
                "${value.time_to}"
            )
        `)
    })            
    //executar db.runs das class_schedules
    await Promise.all(insertedAllClassScheduleValues)


}