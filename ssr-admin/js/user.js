async function fetchUserData() {
    const users = await fetch("/user", {
        method: "GET",
        query: {}
    });

    return users;
}

$(document).ready(async function() {
    const userData = await fetchUserData();
    userData.json().then(data => {
        console.log("userDataJson", data);
        const table = $("#dataTable").DataTable({
            // processing: true,
            // serverSide: true,
            // bPaginate: true,
            // sPaginationType: "full_numbers",
            // paging: true,
            columns: [
                { data: "id" },
                { data: "name" },
                { data: "birth" },
                { data: "gender" },
                { data: "email" },
                { data: "phone" },
                { data: "favorite" },
                { data: "is_admin" }
            ]
        });

        table.clear();
        table.rows.add(data);
        table.draw();
    });

    // "`id`, `name`, `birth`, `gender`, `email`, `phone`, `favorite`, `is_admin`";

    // table.api().ajax.reload();
});
