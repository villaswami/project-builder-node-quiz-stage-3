const express = require("express");
const { MongoClient } = require('mongodb')
const app = express()
app.use(express.json())
const port = 5000
app.listen(port, () => console.log(`Server Running at port ${port}`))

const dbname = 'first'
const namedb = 'nodequiz'
const dburl = `mongodb+srv://villa:villa@cluster0.epqt2.mongodb.net/villa?retryWrites=true&w=majority`
app.get('/', async function (req, res) {
    const client = await MongoClient.connect(dburl)//1
    try {

        res.json({
            message: 'Connected Successfully',

        })
    }
    catch (err) {
        console.log(err)
    }
    finally {
        client.close()
    }
})

//questions 

app.get('/api/questions', async function (req, res) {
    const client = await MongoClient.connect(dburl)
    try {
        let db = client.db(namedb);
        const questions = await db.collection("questions").find().toArray()
        res.json({
            message: 'Displaying all questions',
            questions
        });


    }
    catch (err) {
        console.log(err)
    }
    finally {
        client.close()
    }
})

app.post('/api/questions', async function (req, res) {
    const client = await MongoClient.connect(dburl)


    try {

        const db = client.db(namedb);
        const user = await db.collection("questions").insertOne(req.body);

        res.json({
            message: "Record Inserted",
        })
    } catch (error) {
        console.log(error)
    } finally {
        await client.close();
    }
})

app.get('/api/questions/:id', async function (req, res) {
    const client = await MongoClient.connect(dburl)

    try {

        const db = await client.db(namedb);
        const result = await db.collection("questions").findOne({ id: parseInt(req.params.id) });
        if (result) {
            res.json({
                message: "Record is found",
                result
            });
        } else {
            res.json({
                message: "Record not found"
            });
        }
    } catch (error) {
        console.log(error)
    } finally {
        await client.close();
    }
})

app.put('/api/questions/:id', async function (req, res) {
    const client = await MongoClient.connect(dburl)//1
    try {
        const db = client.db(namedb);
        const record = await db.collection("questions").findOneAndUpdate({ id: parseInt(req.params.id) }, { $set: { question: req.body.question } });
        if (record) {
            res.json({
                message: "Record is updated",
            });
        } else {
            res.json({
                message: "Record not found"
            });
        }
    } catch (error) {
        console.log(error)
    } finally {
        await client.close();
    }
})

app.delete('/api/questions/:id', async function (req, res) {
    const client = await MongoClient.connect(dburl)
    try {
        const db = client.db(namedb);
        const record = await db.collection("questions").deleteOne({ id: parseInt(req.params.id) });
        if (record) {
            res.json({
                message: "Record is deleted",
            });
        } else {
            res.json({
                message: "Record not found"
            });
        }
    } catch (error) {
        console.log(error)
    } finally {

        await client.close();

    }
})

//options 

app.get('/api/options', async function (req, res) {
    const client = await MongoClient.connect(dburl)
    try {
        let db = await client.db(namedb);
        const options = await db.collection("options").find().toArray()
        res.json({
            message: 'Displaying all records',
            options
        });


    }
    catch (err) {
        console.log(err)
    }
    finally {
        client.close()
    }
})

app.post('/api/options', async function (req, res) {
    const client = await MongoClient.connect(dburl)


    try {

        const db = client.db(namedb);
        const user = await db.collection("options").insertOne(req.body);

        res.json({
            message: "Record Inserted",
        })
    } catch (error) {
        console.log(error)
    } finally {
        await client.close();
    }
})

app.get('/api/options/:id', async function (req, res) {
    const client = await MongoClient.connect(dburl)

    try {

        const db = client.db(namedb);
        const result = await db.collection("options").findOne({ id: parseInt(req.params.id) });
        if (result) {
            res.json({
                message: "Record is found",
                result
            });
        } else {
            res.json({
                message: "Record not found"
            });
        }
    } catch (error) {
        console.log(error)
    } finally {
        await client.close();
    }
})

app.put('/api/options/:id', async function (req, res) {
    const client = await MongoClient.connect(dburl)//1

    try {
        const db = client.db(namedb);
        const record = await db.collection("options").findOneAndUpdate({ id: parseInt(req.params.id) }, { $set: { question: req.body.question } });
        if (record) {
            res.json({
                message: "Record is updated",
            });
        } else {
            res.json({
                message: "Record not found"
            });
        }
    } catch (error) {
        console.log(error)
    } finally {
        await client.close();
    }
})

app.delete('/api/options/:id', async function (req, res) {
    const client = await MongoClient.connect(dburl)
    try {
        const db = client.db(namedb);
        const record = await db.collection("options").deleteOne({ id: parseInt(req.params.id) });
        if (record) {
            res.json({
                message: "Record is deleted",
            });
        } else {
            res.json({
                message: "Record not found"
            });
        }
    } catch (error) {
        console.log(error)
    } finally {

        await client.close();

    }
})

//answers 

app.get('/api/answers', async function (req, res) {
    const client = await MongoClient.connect(dburl)
    try {
        let db = client.db(namedb);
        const answers = await db.collection("answers").find().toArray()
        res.json({
            message: 'Displaying all records',
            answers
        });


    }
    catch (err) {
        console.log(err)
    }
    finally {
        client.close()
    }
})

app.post('/api/answers', async function (req, res) {
    const client = await MongoClient.connect(dburl)


    try {

        const db = client.db(namedb);
        const user = await db.collection("answers").insertOne(req.body);

        res.json({
            message: "Record Inserted",
        })
    } catch (error) {
        console.log(error)
    } finally {
        await client.close();
    }
})

app.get('/api/answers/:id', async function (req, res) {
    const client = await MongoClient.connect(dburl)

    try {

        const db = client.db(namedb);
        const result = await db.collection("answers").findOne({ id: parseInt(req.params.id) });
        if (result) {
            res.json({
                message: "Record is found",
                result
            });
        } else {
            res.json({
                message: "Record not found"
            });
        }
    } catch (error) {
        console.log(error)
    } finally {
        await client.close();
    }
})

app.put('/api/answers/:id', async function (req, res) {
    const client = await MongoClient.connect(dburl)//1
    try {
        const db = client.db(namedb);
        const record = await db.collection("answers").findOneAndUpdate({ id: parseInt(req.params.id) }, { $set: { question: req.body.question } });
        if (record) {
            res.json({
                message: "Record is updated",
            });
        } else {
            res.json({
                message: "Record not found"
            });
        }
    } catch (error) {
        console.log(error)
    } finally {
        await client.close();
    }
})

app.delete('/api/answers/:id', async function (req, res) {
    const client = await MongoClient.connect(dburl)
    try {
        const db = client.db(namedb);
        const record = await db.collection("answers").deleteOne({ id: parseInt(req.params.id) });
        if (record) {
            res.json({
                message: "Record is deleted",
            });
        } else {
            res.json({
                message: "Record not found"
            });
        }
    } catch (error) {
        console.log(error)
    } finally {

        await client.close();

    }
})
