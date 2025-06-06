import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import useMarks from "@/hooks/useMarks";
import { TableCell } from "@/components/ui/table";

const StudentTableRow = ({ student, projects }) => {
  const [isMarksModalOpen, setIsMarksModalOpen] = useState(false);
  const [marks, setMarks] = useState([]);

  const {
    data: marksData,
    loading: marksLoading,
    statusCode: marksStatusCode,
    addOrUpdateMark,
  } = useMarks(student?.id);

  useEffect(() => {
    if (marksData?.marks && Array.isArray(marksData?.marks)) {
      setMarks(
        marksData.marks.map((item) => ({
          id: item.mark_id,
          student_module_id: item.student_module_id,
          module_id: item.module_id,
          title: item.title,
          year: item.year,
          score: item.score,
          td_score: item.td_score,
          tp_score: item.tp_score,
        }))
      );
    }
  }, [marksData]);

  const handleMarkChange = (markId, field, value) => {
    setMarks((prev) =>
      prev.map((mark) =>
        mark.student_module_id === markId ? { ...mark, [field]: value } : mark
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const mark of marks) {
      await addOrUpdateMark({
        ...mark,
        student_id: student.id,
        student_module_id: mark.student_module_id,
      });
    }
    setIsMarksModalOpen(false);
  };

  return (
    <>
      <motion.tr
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <TableCell className="text-center">{student.id}</TableCell>
        <TableCell className="font-medium">{student.first_name}</TableCell>
        <TableCell className="font-medium">{student.last_name}</TableCell>
        <TableCell>{student.email}</TableCell>
        <TableCell>{student.department?.toUpperCase()}</TableCell>
        <TableCell>Group1</TableCell>
        <TableCell>
          <div className="flex flex-wrap gap-2">
            {student.wishlist_projects?.length > 0 ? (
              student.wishlist_projects.map((project, index) => (
                <Badge key={index} variant="secondary">
                  {project.title}
                </Badge>
              ))
            ) : (
              <Badge variant="outline">No projects in wishlist</Badge>
            )}
          </div>
        </TableCell>
        <TableCell>
          <Button variant="outline" onClick={() => setIsMarksModalOpen(true)}>
            Add Marks
          </Button>
        </TableCell>
      </motion.tr>

      <Dialog open={isMarksModalOpen} onOpenChange={setIsMarksModalOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Student Marks</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            {marks.map((mark) => (
              <motion.div
                key={mark.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold">
                  Module: {mark.title || mark.module_id} ({mark.year})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`score-${mark.student_module_id}`}>
                      Exam Mark
                    </Label>
                    <Input
                      id={`score-${mark.student_module_id}`}
                      type="number"
                      value={mark.score ?? ""}
                      onChange={(e) =>
                        handleMarkChange(
                          mark.student_module_id,
                          "score",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`td_score-${mark.student_module_id}`}>
                      TD Mark
                    </Label>
                    <Input
                      id={`td_score-${mark.student_module_id}`}
                      type="number"
                      value={mark.td_score ?? ""}
                      onChange={(e) =>
                        handleMarkChange(
                          mark.student_module_id,
                          "td_score",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`tp_score-${mark.student_module_id}`}>
                      TP Mark
                    </Label>
                    <Input
                      id={`tp_score-${mark.student_module_id}`}
                      type="number"
                      value={mark.tp_score ?? ""}
                      onChange={(e) =>
                        handleMarkChange(
                          mark.student_module_id,
                          "tp_score",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              </motion.div>
            ))}
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsMarksModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Marks</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StudentTableRow;
