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
            <div class="section-title">Junta de Vecinos:</div>
            <div>{{ $meeting->neighborhoodAssociation->name ?? 'No especificado' }}</div>
        </div>
        <div class="section">
            <div class="section-title">Asistentes:</div>
            <table class="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Asistió</th>
                        <th>Motivo de inasistencia</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($meeting->attendances as $attendance)
                    <tr>
                        <td>{{ $attendance->neighbor?->user?->name ?? 'N/A' }}</td>
                        <td>{{ $attendance->attended ? 'Sí' : 'No' }}</td>
                        <td>{{ $attendance->attended ? '-' : ($attendance->absence_reason ?? '-') }}</td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="3">Sin registros de asistencia.</td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
        <div class="section">
            <div class="section-title">Resultado / Acuerdos:</div>
            <div>{{ $meeting->result ?? 'No especificado' }}</div>
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
