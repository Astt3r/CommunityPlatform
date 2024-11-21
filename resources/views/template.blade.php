<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Acta de Reunión</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 40px;
        }
        .header {
            text-align: center;
            margin-bottom: 40px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .header h2 {
            margin: 5px 0;
            font-size: 18px;
        }
        .content {
            margin: 0 20px;
        }
        .section {
            margin-bottom: 20px;
        }
        .section-title {
            font-weight: bold;
            font-size: 16px;
            margin-bottom: 5px;
            text-decoration: underline;
        }
        .table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        .table th, .table td {
            border: 1px solid #000;
            padding: 10px;
            text-align: left;
        }
        .signature {
            margin-top: 40px;
            display: flex;
            justify-content: space-between;
        }
        .signature div {
            text-align: center;
            width: 45%;
        }
        .signature-line {
            border-top: 1px solid #000;
            margin-top: 50px;
            padding-top: 5px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Acta de Reunión</h1>
        <h2>Tema Principal: {{ $meeting->main_topic }}</h2>
    </div>
    <div class="content">
        <div class="section">
            <div class="section-title">Fecha y Hora:</div>
            <div>{{ \Carbon\Carbon::parse($meeting->meeting_date)->format('d/m/Y H:i') }}</div>
        </div>
        <div class="section">
            <div class="section-title">Lugar:</div>
            <div>{{ $meeting->location ?? 'No especificado' }}</div>
        </div>
        <div class="section">
            <div class="section-title">Descripción:</div>
            <div>{{ $meeting->description ?? 'Sin descripción' }}</div>
        </div>
        <div class="section">
            <div class="section-title">Organizada por:</div>
            <div>{{ $meeting->organized_by ?? 'No especificado' }}</div>
        </div>
        <div class="section">
            <div class="section-title">Asistentes:</div>
            <table class="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Rol</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($meeting->attendees as $attendee)
                    <tr>
                        <td>{{ $attendee->name }}</td>
                        <td>{{ $attendee->role }}</td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
        <div class="section">
            <div class="section-title">Puntos Tratados:</div>
            <div>{{ $meeting->agenda_points ?? 'No especificado' }}</div>
        </div>
        <div class="section">
            <div class="section-title">Acuerdos y Tareas:</div>
            <div>{{ $meeting->agreements ?? 'No especificado' }}</div>
        </div>
        <div class="section">
            <div class="section-title">Estado de la Reunión:</div>
            <div>{{ $meeting->status }}</div>
        </div>
    </div>
    <div class="signature">
        <div>
            <div class="signature-line">Presidente</div>
        </div>
        <div>
            <div class="signature-line">Secretario</div>
        </div>
    </div>
</body>
</html>
