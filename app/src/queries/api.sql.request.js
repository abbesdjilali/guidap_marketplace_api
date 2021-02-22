exports.getAllLeisureCentres = `SELECT l.centreName,l.description,l.website,l.address,
                                CONCAT("[", GROUP_CONCAT(c.name), "]") categories
                                FROM leisurecentre l 
                                LEFT JOIN leisurecentre_categories lc 
                                ON lc.leisurecentre_id = l.id
                                LEFT JOIN categories c
                                ON lc.categories_id = c.id
                                GROUP BY l.id;`
