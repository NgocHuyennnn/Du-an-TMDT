import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

import {
  
  MOCK_PERMISSION_MATRIX
} from '@/data/mockDataAd';


export default function PermissionPanel({
  initialGroups,
  readOnly = false,
  onChange,
  roleKey = 'ADMIN'
}) {


  const [groups, setGroups] = useState(() =>
  structuredClone(initialGroups || MOCK_PERMISSION_MATRIX).map(group => ({
    ...group,
    permissions: group.permissions.map(permission => ({
      ...permission,
      ADMIN: false,
      MANAGER: false,
      STAFF: false,
      CUSTOMER: false
    }))
  }))
);
  const [searchTerm, setSearchTerm] = useState('');


  const [expandedGroups, setExpandedGroups] = useState(
  (initialGroups || MOCK_PERMISSION_MATRIX).map(g => g.module)
);

  const toggleGroup = (module) => {

    setExpandedGroups(prev =>
      prev.includes(module)
        ? prev.filter(x => x !== module)
        : [...prev, module]
    );

  };



  const togglePermission = (
    module,
    permissionId,
    role
  ) => {

    if(readOnly) return;


    const newGroups = groups.map(group => {

      if(group.module !== module)
        return group;


      return {
        ...group,

        permissions:
        group.permissions.map(permission =>

          permission.id === permissionId

          ? {
              ...permission,
              [role]: !permission[role]
            }

          : permission

        )
      };

    });


    setGroups(newGroups);

    onChange?.(newGroups);

  };



  const filteredGroups = groups
  .map(group => ({
    ...group,

    permissions:
    group.permissions.filter(permission =>
      permission.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    )

  }))

  .filter(group =>
    group.permissions.length > 0
  );



  const totalChecked = groups.reduce(
  (total, group)=>
    total +
    group.permissions.filter(
      p =>
        p.ADMIN ||
        p.MANAGER ||
        p.STAFF ||
        p.CUSTOMER
    ).length,
  0
);

  const totalPermissions = groups.reduce(
    (total, group)=>
      total + group.permissions.length,
    0
  );



return (

<div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">


<div className="flex justify-between mb-5">

<div>

<h3 className="text-base font-semibold text-gray-900">
Phân quyền
</h3>


<p className="text-xs text-gray-500">

{totalChecked}/{totalPermissions}
quyền đã chọn

</p>


</div>

</div>



<div className="relative mb-4">

<Search
size={16}
className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
/>


<input

value={searchTerm}

onChange={
e=>setSearchTerm(e.target.value)
}

placeholder="Tìm kiếm quyền..."

className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm"

/>

</div>




<div className="space-y-3">


{
filteredGroups.map(group=>{


const expanded =
expandedGroups.includes(group.module);



return (


<div
key={group.module}
className="border rounded-xl overflow-hidden"
>


<button

onClick={() =>
toggleGroup(group.module)
}

className="w-full flex justify-between px-4 py-3 bg-gray-50"

>


<span className="font-semibold text-sm">

{group.module}

</span>
<span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
{
group.permissions.filter(
 p => p[roleKey]
).length
}
/
{group.permissions.length}
</span>


<ChevronDown
size={16}
className={
expanded
? "rotate-180"
: ""
}
/>


</button>




{
expanded &&

<div className="p-4 space-y-3">


{
group.permissions.map(permission=>(


<div key={permission.id}>


<p className="text-sm font-semibold">

{permission.name}

</p>



<div className="flex gap-3 mt-2">


<button

type="button"

onClick={() =>
togglePermission(
group.module,
permission.id,
roleKey
)
}

className={`
w-10 h-5 rounded-full p-1
${permission[roleKey]
?'bg-blue-600'
:'bg-gray-300'}
`}

>

<div

className={`
w-3 h-3 bg-white rounded-full transition
${permission[roleKey]
?'translate-x-5'
:''}
`}

/>

</button>







</div>


</div>


))

}


</div>

}



</div>


)

})

}


</div>

</div>


)

}