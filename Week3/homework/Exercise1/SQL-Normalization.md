### 3.1. Exercise 1 : SQL Normalization

The manager of the dinner club would like to manage the information system that assists him to keep track of the dinners
had by members.
Because the manager is not an expert of Information Systems, (s)he uses the following table to store the information.
Please help the manger by using the knowledge of database normal forms.
Save all answers in a text file / MD file.

1. What columns violate 1NF? 
  -  1NF - need will be one value, same type, unique names, no dublicated. 1 Box - 1 thing
   - dinner_date has many different date formats
   - food_code has many values in one cell
   - food_description has many values in one cell
 
2. What entities do you recognize that could be extracted?
   - entities - is things or objects. ERP diagram consist with : entities, atributes, relationships.
   -  atributes is describe entities. relationships: one to many, many to many, many to one.
  -  We can see these entities:
   Member
   Dinner
   Venue
   Food
   Member–Dinner (members join dinners)
   Dinner–Food (dinners have many foods)
3. Name all the tables and columns that would make a 3NF compliant solution.
- 3NF - Must be 2NF before.
- No transitive dependency: column cannot depend on a non-key column.
  -  1.Member
   member_id
   member_name
   member_address
   - 2.Dinner
   dinner_id
   dinner_date
   venue_code
   - 3.Venue
   venue_code
   venue_description
   - 4.Food
   food_code
   food_description
   - 5.Dinner_Food
   dinner_id
   food_code
   - 6.Member_Dinner
   member_id
   dinner_id

```
+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+
| member_id | member_name   | member_address | dinner_id | dinner_date | venue_code | venue_description | food_code | food_description |
+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+
|         1 | Amit          | 325 Max park   | D00001001 | 2020-03-15  | B01        | Grand Ball Room   | C1, C2    | Curry, Cake      |
|         2 | Ben           | 24 Hudson lane | D00001002 | 2020/03/15  | B02        | Zoku Roof Top     | S1, C2    | Soup, Cake       |
|         3 | Cristina      | 516 6th Ave    | D00001002 | 2020/03/15  | B02        | Zoku Roof Top     | S1, C2    | Soup, Cake       |
|         4 | Dan           | 89 John St     | D00001003 | 20-03-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
|         1 | Amit          | 325 Max park   | D00001003 | 20-03-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
|         3 | Cristina      | 516 6th Ave    | D00001004 | Mar 25 '20  | B04        | Mama's Kitchen    | F1, M1    | Falafal, Mousse  |
|         5 | Gabor         | 54 Vivaldi St  | D00001005 | Mar 26 '20  | B05        | Hungry Hungary    | G1, P2    | Goulash, Pasca   |
|         6 | Hema          | 9 Peter St     | D00001003 | 01-04-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+
```