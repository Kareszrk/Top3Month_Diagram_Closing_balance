const pool = createPool({
    host: "HOST_COMES_HERE",
    user: "USERNAME_COMES_HERE",
    password: "PASSWORD_COMES_HERE",
    database: "DATABASE_COMES_HERE",
    connectionLimit: 10
});

 router.get('/test4', async(req, res) => {
  await pool.query(`SELECT MONTHNAME(datum) as honap, YEAR(datum) as ev, SUM(egyenleg) as egyenleg FROM egyenlegvaltozasok GROUP BY MONTHNAME(datum), YEAR(datum) HAVING ev = YEAR(CURRENT_DATE()) ORDER BY egyenleg DESC LIMIT 3`, async (err, result, fields) => {
    if(err) res.json(err);
    let honapok = [], zaro_egyenlegek = [];
    for(let i = 0; i < result.length; i++){
      honapok.push(`${result[i].ev} - ${result[i].honap}`);
      zaro_egyenlegek.push(result[i].egyenleg);
    }
    res.json({
      honapok: honapok,
      zaroEgyenlegek: zaro_egyenlegek
    });
   });
 });