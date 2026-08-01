import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, router } from "@inertiajs/react";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import { parseISO, format, isValid } from "date-fns";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const VOTE_COLORS = ["#4ade80", "#38bdf8", "#facc15", "#f87171", "#a78bfa", "#fb923c"];

// Registering a default font
Font.register({ family: 'Helvetica', src: 'https://fonts.gstatic.com/s/helvetica/v7/sW-KlwMSXsW7buS-aUr5.mp4' });

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Helvetica",
    lineHeight: 1.6,
    backgroundColor: "#f3f3f3",
  },
  header: {
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: "#4A90E2",
    color: "#fff",
  },
  date: {
    textAlign: "center",
    marginBottom: 30,
    fontSize: 14,
    color: "#333",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  sectionContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  sectionContent: {
    fontSize: 14,
    color: "#555",
  },
});

const MeetingPdfDocument = ({ meeting }) => {
  if (!meeting) {
    return null;
  }

  const mainTopic = meeting.main_topic || "No especificado";
  const location = meeting.location || "No especificado";
  const description = meeting.description || "Sin descripción";
  const status = meeting.status || "No especificado";
  const neighborhoodAssociation = meeting.neighborhood_association || "Reunión General";

  const formattedDate = meeting.meeting_date ? (() => {
    const dateObj = new Date(meeting.meeting_date);
    return isValid(dateObj) ? format(dateObj, "dd 'de' MMMM 'de' yyyy") : "No especificado";
  })() : "No especificado";

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>ACTA DE LA REUNIÓN</Text>
        </View>
        <Text style={styles.date}>FECHA: {formattedDate}</Text>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Tema Principal</Text>
          <Text style={styles.sectionContent}>{mainTopic}</Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Lugar</Text>
          <Text style={styles.sectionContent}>{location}</Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Descripción</Text>
          <Text style={styles.sectionContent}>{description}</Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Estado de la Reunión</Text>
          <Text style={styles.sectionContent}>{status}</Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Junta Vecinal</Text>
          <Text style={styles.sectionContent}>{neighborhoodAssociation}</Text>
        </View>
      </Page>
    </Document>
  );
};


function statusColorClass(status) {
  switch (status) {
    case "completed":
      return "text-green-500";
    case "canceled":
      return "text-red-500";
    case "in_progress":
      return "text-amber-500";
    default:
      return "text-blue-500";
  }
}

function LiveVoteSection({ meeting, openVote, canVote }) {
  const [liveVote, setLiveVote] = useState(openVote);
  const [closedResult, setClosedResult] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [casting, setCasting] = useState(false);

  useEffect(() => {
    setLiveVote(openVote);
    setClosedResult(null);
    setSelectedOption(null);
  }, [openVote]);

  useEffect(() => {
    if (!window.Echo) return undefined;

    const channelName = `meeting.${meeting.id}`;
    const channel = window.Echo.private(channelName);

    channel.listen(".vote.opened", (payload) => {
      setLiveVote({
        id: payload.vote_id,
        question: payload.question,
        options: payload.options.map((o) => ({ id: o.id, label: o.label, count: o.count })),
        has_voted: false,
      });
      setClosedResult(null);
      setSelectedOption(null);
    });

    channel.listen(".vote.tally-updated", (payload) => {
      setLiveVote((prev) =>
        prev && prev.id === payload.vote_id
          ? { ...prev, options: payload.tallies.map((t) => ({ id: t.option_id, label: t.label, count: t.count })) }
          : prev
      );
    });

    channel.listen(".vote.closed", (payload) => {
      setLiveVote((prev) => {
        setClosedResult({
          question: prev?.question,
          options: payload.tallies.map((t) => ({ id: t.option_id, label: t.label, count: t.count })),
        });
        return null;
      });
    });

    return () => {
      window.Echo.leave(channelName);
    };
  }, [meeting.id]);

  const openForm = useForm({ question: "", options: ["", ""] });

  const handleAddOption = () => {
    if (openForm.data.options.length >= 6) return;
    openForm.setData("options", [...openForm.data.options, ""]);
  };

  const handleRemoveOption = (index) => {
    if (openForm.data.options.length <= 2) return;
    openForm.setData("options", openForm.data.options.filter((_, i) => i !== index));
  };

  const handleOptionChange = (index, value) => {
    const next = [...openForm.data.options];
    next[index] = value;
    openForm.setData("options", next);
  };

  const handleOpenVote = (e) => {
    e.preventDefault();
    openForm.post(route("meetings.votes.store", meeting.id), {
      preserveScroll: true,
      onSuccess: () => openForm.reset(),
    });
  };

  const handleCastVote = () => {
    if (!selectedOption) return;
    setCasting(true);
    router.post(
      route("meetings.votes.cast", meeting.id),
      { option_id: selectedOption },
      { preserveScroll: true, onFinish: () => setCasting(false) }
    );
  };

  const handleCloseVote = () => {
    router.post(route("meetings.votes.close", meeting.id), {}, { preserveScroll: true });
  };

  if (!liveVote && !closedResult && !canVote.open) {
    return null;
  }

  return (
    <div className="bg-white shadow sm:rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-semibold">Votación en Vivo</h3>

      {liveVote && (
        <div className="space-y-4">
          <p className="font-medium">{liveVote.question}</p>

          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={liveVote.options}>
              <XAxis dataKey="label" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count">
                {liveVote.options.map((entry, index) => (
                  <Cell key={entry.id} fill={VOTE_COLORS[index % VOTE_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {canVote.cast && !liveVote.has_voted && (
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {liveVote.options.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setSelectedOption(option.id)}
                    className={`px-4 py-2 rounded border ${
                      selectedOption === option.id
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={handleCastVote}
                disabled={!selectedOption || casting}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {casting ? "Enviando..." : "Votar"}
              </button>
            </div>
          )}

          {canVote.cast && liveVote.has_voted && (
            <p className="text-green-600">Ya registraste tu voto en esta votación.</p>
          )}

          {canVote.close && (
            <button
              type="button"
              onClick={handleCloseVote}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Cerrar Votación
            </button>
          )}
        </div>
      )}

      {!liveVote && closedResult && (
        <div className="space-y-4">
          <p className="font-medium">{closedResult.question}</p>
          <p className="text-gray-500 text-sm">Votación cerrada.</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={closedResult.options}>
              <XAxis dataKey="label" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count">
                {closedResult.options.map((entry, index) => (
                  <Cell key={entry.id} fill={VOTE_COLORS[index % VOTE_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {!liveVote && !closedResult && canVote.open && (
        <form onSubmit={handleOpenVote} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Pregunta</label>
            <input
              type="text"
              value={openForm.data.question}
              onChange={(e) => openForm.setData("question", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              placeholder="¿Aprueban el presupuesto?"
            />
            {openForm.errors.question && (
              <p className="text-sm text-red-600">{openForm.errors.question}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Opciones</label>
            {openForm.data.options.map((option, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm"
                  placeholder={`Opción ${index + 1}`}
                />
                {openForm.data.options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(index)}
                    className="px-2 text-red-500"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            {openForm.errors.options && (
              <p className="text-sm text-red-600">{openForm.errors.options}</p>
            )}
            {openForm.data.options.length < 6 && (
              <button type="button" onClick={handleAddOption} className="text-sm text-blue-600">
                + Agregar opción
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={openForm.processing}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Abrir Votación
          </button>
        </form>
      )}
    </div>
  );
}

export default function ShowMeeting({ meeting, openVote = null, canVote = { open: false, close: false, cast: false }, userRole = "guest" }) {
  // Formatear la fecha de la reunión en UTC
  const formattedDate = meeting.meeting_date ? (() => {
    const parsedDate = parseISO(meeting.meeting_date);
    const zonedDate = parsedDate; // Asumimos que la fecha ya es UTC
    return isValid(zonedDate) ? format(zonedDate, "dd/MM/yyyy HH:mm 'UTC'") : "No especificado";
  })() : "No especificado";

  const isResident = userRole === "resident";

  return (
    <AuthenticatedLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Detalles de la Reunión
        </h2>
      }
    >
      <Head title={`Reunión - ${meeting.main_topic}`} />

      <div className="py-12">
        <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white shadow sm:rounded-lg p-6 space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Tema Principal:</h3>
              <p>{meeting.main_topic}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Fecha:</h3>
              <p>{formattedDate}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Descripción:</h3>
              <p>{meeting.description || "Sin descripción"}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Lugar:</h3>
              <p>{meeting.location || "No especificado"}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Estado:</h3>
              <p className={statusColorClass(meeting.status)}>{meeting.status}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Junta Vecinal:</h3>
              <p>{meeting.neighborhood_association || "Reunión General"}</p>
            </div>

            <div className="mt-4">
              <a
                href="/meetings"
                className="text-blue-500 hover:text-blue-700"
              >
                Volver a la lista de reuniones
              </a>
            </div>

            {!isResident && (
              <div className="mt-4">
              {meeting.status !== "canceled" && !isResident && (
                <>
                  <a
                    href={`/meetings/${meeting.id}/attendance`}
                    className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Registrar Asistencias
                  </a>
            
                  <div className="mt-4">
                    <PDFDownloadLink
                      document={<MeetingPdfDocument meeting={meeting} />}
                      fileName={`Acta_Reunion_${meeting.main_topic}.pdf`}
                      className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      {({ loading }) =>
                        loading ? "Generando PDF..." : "Generar Acta de Reunión en PDF"
                      }
                    </PDFDownloadLink>
                  </div>
                </>
              )}
            
              {meeting.status === "canceled" && (
                <div className="mt-4 text-red-500">
                  Esta reunión ha sido cancelada. No es posible registrar asistencia ni generar un acta.
                </div>
              )}
            </div>
            )}            

            {isResident && (
              <div className="mt-4">
                <p className="text-gray-500">Como residente, no tienes permisos para generar actas ni registrar asistencias.</p>
              </div>
            )}
          </div>

          {!meeting.is_canceled && (
            <div className="mt-6">
              <LiveVoteSection meeting={meeting} openVote={openVote} canVote={canVote} />
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
