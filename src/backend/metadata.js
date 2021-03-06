const meta = [
    {
        "id":"department",
        "name":"Департаменты",
        "fields":[
            {
                "id":"name",
               'name':'name',
                'title':'Название департамента',
                'type':'string',
                'required':true,
                'validations':{
                    'isExisty':true,
                    'minLength':2,
                    'maxLength':150,
                }
            },
        ]
    },
{
    "id":'employeer',
    "name":"Сотрудники",
    "fields":[
        {
            "id":"firstName",
            'name':'firstName',
            'title':'Имя',
            'type':'string',
            'required':true,
            'validations':{
            'isExisty':true,
                'minLength':2,
                'maxLength':150,
        }
    },
    {
        "id":"lastName",
        'name':'lastName',
        'title':'Фамилия',
        'type':'string',
        'required':true,
        'validations':{
        'isExisty':true,
            'minLength':2,
            'maxLength':150,
        }
    },
    {
        "id":"department",
        'name':'departmentId',
        'title':'Департамент',
        'type':'integer',
        'required':true,
        'validations':{
        'isExisty':true,
            'isInt':true,
        }
    }
    ]

}
]
module['exports'] = meta;