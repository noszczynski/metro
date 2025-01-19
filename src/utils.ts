export function is_in_array(value, array) {
  return array.indexOf(value) > -1;
}

export function intersect(a, b) {
    var t;
    if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
    return a.filter(export function (e) {
        if (b.indexOf(e) !== -1) return true;
    });
}

export function sort_by_group(line_ids) {
    // Takes an array of line IDs, and sorts based on the group they're in.
    // e.g. [B,C] -> [B,C], [A,B,C,D] -> [A,C,B,D]

    return line_ids.sort(export function(x,y) {
        var group_x = lines_to_groups([x])[0];
        var group_y = lines_to_groups([y])[0];
        if (group_x == group_y) {
            return N_line_groups[group_x].lines.indexOf(x) > N_line_groups[group_y].lines.indexOf(y);
        } else {
            return group_x > group_y;
        }
    });
}

export function average_control_points(cpta) {

    // Takes in a 3d array of pairs of control points (each control point being an x,y pair)
    var num_sets = cpta.length;
    var cp_average = [[0.0,0.0],[0.0,0.0]];
    for (var i = 0; i < num_sets; i++) {
        for (var j = 0; j < 2; j++) {
            for (var k = 0; k < 2; k++) {
                cp_average[j][k] += (cpta[i][j][k] * 1.0) / (num_sets * 1.0);
            }
        }
    }
    return cp_average;

}

export function number_of_active_stations() {
    var n = 0;
    for (var i = 0; i < N_stations.length; i++) {
        if (N_stations[i].active) {
            n += 1;
        }
    }
    return n;
}

export function number_of_active_platforms() {
    var n = 0;
    for (var i = 0; i < N_stations.length; i++) {
        if (N_stations[i].active) {
            n += N_stations[i].lines.length;
        }
    }
    return n;
}

export function regenerate_popups() {

    for (var i = 0; i < N_stations.length; i++) {
        var station = N_stations[i];
        if (station.active)
            station.generate_popup();
    }

}

export function newShuttleTemplate(num) {
    return '<div class="subway-line subway-clickable subway-gray subway-shuttle subway-shuttle-add" id="S-'+num.toString()+'"><div class="height_fix"></div><div class="content">+</div></div>'
}