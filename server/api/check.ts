export default defineEventHandler(async (event) => {
    // const { id } = event.data;
    // const check = await Check
    //     .query()
    //     .findById
    //     .throwIfNotFound();
    // return check;
    // const { name } = getQuery(event)

    // const { age } = await readBody(event);

    // return { message: `Hello, ${name}, You are ${age} years old` };

    const { data } = await $fetch('https://api.currencyapi.com/v3/latest?apikey=eJdPhICJUDBt6B4e4IX6DZ4A9Xos4Z2JRZ8xh2v2')
    console.log(data);
    return data;
});