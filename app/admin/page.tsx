'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { StepProcess } from '@/components/step-process'
import { StatCard } from '@/components/stat-card'
import { Upload, BarChart3, CheckCircle2, Zap } from 'lucide-react'

export default function AdminPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [trainingProgress, setTrainingProgress] = useState(0)
  const [isTraining, setIsTraining] = useState(false)

  const handleStartTraining = () => {
    setIsTraining(true)
    setCurrentStep(1)
    setTrainingProgress(0)

    // Simulate training progress
    const interval = setInterval(() => {
      setTrainingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setCurrentStep(3)
          setIsTraining(false)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 500)

    return () => clearInterval(interval)
  }

  const handleReset = () => {
    setCurrentStep(0)
    setTrainingProgress(0)
    setIsTraining(false)
  }

  const steps = [
    {
      number: 1,
      title: 'Input Dataset Ayam',
      description: 'Upload dataset gambar ayam untuk training model',
      icon: <Upload size={32} />,
      isCompleted: currentStep > 0,
    },
    {
      number: 2,
      title: 'Training Model YOLOv12',
      description: 'Sistem melatih model dengan dataset yang Anda upload',
      icon: <Zap size={32} />,
      isCompleted: currentStep > 2,
    },
    {
      number: 3,
      title: 'Evaluasi Model',
      description: 'Menguji performa model dengan data validasi',
      icon: <BarChart3 size={32} />,
      isCompleted: currentStep > 2,
    },
    {
      number: 4,
      title: 'Hasil Training Selesai',
      description: 'Model siap digunakan untuk deteksi ayam',
      icon: <CheckCircle2 size={32} />,
      isCompleted: currentStep > 3,
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Panel Admin - Training Dataset
            </h1>
            <p className="text-muted-foreground text-lg">
              Latih model YOLOv12 dengan dataset ayam Anda sendiri untuk meningkatkan akurasi deteksi
            </p>
          </div>

          {/* Main Content */}
          {currentStep === 0 && (
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Left: Upload Form */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">Upload Dataset</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Dataset Gambar Ayam
                    </label>
                    <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                      <div className="flex justify-center mb-4">
                        <Upload className="text-primary" size={48} />
                      </div>
                      <p className="font-semibold text-foreground mb-2">
                        Seret dan lepas folder dataset di sini
                      </p>
                      <p className="text-sm text-muted-foreground">
                        atau klik untuk memilih file
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Jumlah Epoch
                    </label>
                    <input
                      type="number"
                      defaultValue="50"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Learning Rate
                    </label>
                    <input
                      type="number"
                      defaultValue="0.001"
                      step="0.0001"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <button
                    onClick={handleStartTraining}
                    className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Mulai Training
                  </button>
                </div>
              </div>

              {/* Right: Info */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">Informasi Dataset</h2>

                <div className="bg-card rounded-xl p-6 border border-border space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Status Dataset</p>
                    <p className="text-2xl font-bold text-primary">Belum Diupload</p>
                  </div>

                  <div className="border-t border-border pt-4">
                    <p className="text-sm text-muted-foreground mb-2">Format yang Diterima:</p>
                    <ul className="text-sm text-foreground space-y-1">
                      <li>• JPG, PNG, WebP</li>
                      <li>• Minimum 100 gambar</li>
                      <li>• Ukuran total max 500MB</li>
                    </ul>
                  </div>

                  <div className="border-t border-border pt-4">
                    <p className="text-sm text-muted-foreground mb-2">Waktu Estimasi:</p>
                    <p className="text-sm text-foreground font-semibold">~15-30 menit</p>
                  </div>
                </div>

                <div className="bg-secondary/30 border border-secondary rounded-xl p-4">
                  <h4 className="font-semibold text-foreground mb-2">💡 Tips Training</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Gunakan dataset yang beragam</li>
                    <li>• Pastikan gambar berkualitas tinggi</li>
                    <li>• Split data untuk training & validasi</li>
                    <li>• Monitor loss dan accuracy</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Training In Progress */}
          {(isTraining || currentStep > 0) && (
            <div className="space-y-8">
              <StepProcess steps={steps} currentStep={currentStep} />

              {isTraining && (
                <div className="bg-card rounded-xl p-8 border border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Training Progress
                  </h3>

                  {/* Progress Bar */}
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground">Progress: {Math.round(trainingProgress)}%</span>
                      <span className="text-muted-foreground">Estimated: 15 min 30 sec</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-primary to-accent h-full transition-all duration-300"
                        style={{ width: `${trainingProgress}%` }}
                      />
                    </div>
                  </div>

                  {/* Statistics */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-background rounded-lg p-4 border border-border">
                      <p className="text-xs text-muted-foreground mb-1">Current Epoch</p>
                      <p className="text-2xl font-bold text-primary">
                        {Math.round((trainingProgress / 100) * 50)} / 50
                      </p>
                    </div>
                    <div className="bg-background rounded-lg p-4 border border-border">
                      <p className="text-xs text-muted-foreground mb-1">Training Loss</p>
                      <p className="text-2xl font-bold text-foreground">
                        {(0.8 - (trainingProgress / 100) * 0.5).toFixed(3)}
                      </p>
                    </div>
                    <div className="bg-background rounded-lg p-4 border border-border">
                      <p className="text-xs text-muted-foreground mb-1">Validation Acc</p>
                      <p className="text-2xl font-bold text-accent">
                        {(45 + (trainingProgress / 100) * 50).toFixed(1)}%
                      </p>
                    </div>
                  </div>

                  {/* Log Output */}
                  <div className="mt-6 bg-background rounded-lg p-4 font-mono text-xs text-muted-foreground max-h-48 overflow-y-auto border border-border">
                    <div className="space-y-1">
                      <div>{'>'} Loading dataset...</div>
                      <div>{'>'} Found 250 training images</div>
                      <div>{'>'} Found 50 validation images</div>
                      <div>{'>'} Initializing YOLOv12 model...</div>
                      <div>{'>'} Starting training...</div>
                      <div className="text-primary">{'>'} Epoch 1/50 - Loss: 0.7234</div>
                      <div className="text-primary">{'>'} Epoch {Math.round((trainingProgress / 100) * 50)}/50 - Loss: {(0.8 - (trainingProgress / 100) * 0.5).toFixed(4)}</div>
                      {trainingProgress === 100 && (
                        <>
                          <div className="text-accent">{'>'} Training completed successfully!</div>
                          <div className="text-accent">{'>'} Final accuracy: 94.2%</div>
                          <div className="text-accent">{'>'} Model saved as: model_v1.pt</div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {!isTraining && currentStep > 0 && (
                <div className="bg-card rounded-xl p-8 border-2 border-accent">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    ✓ Training Selesai!
                  </h3>

                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <StatCard
                      icon={<span className="text-2xl">📊</span>}
                      title="Training Accuracy"
                      value="94.2%"
                      subtitle="Akurasi training"
                    />
                    <StatCard
                      icon={<span className="text-2xl">✓</span>}
                      title="Validation Accuracy"
                      value="92.8%"
                      subtitle="Akurasi validasi"
                    />
                    <StatCard
                      icon={<span className="text-2xl">🎯</span>}
                      title="Mean Precision"
                      value="93.5%"
                      subtitle="Precision rate"
                    />
                  </div>

                  <div className="space-y-2 mb-6">
                    <button className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors">
                      Download Model
                    </button>
                    <button
                      onClick={handleReset}
                      className="w-full bg-secondary text-secondary-foreground py-3 rounded-xl font-semibold hover:bg-secondary/90 transition-colors"
                    >
                      Training Baru
                    </button>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Model siap digunakan untuk deteksi ayam. Anda dapat menggunakan model ini dalam aplikasi deteksi untuk hasil yang lebih akurat.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
